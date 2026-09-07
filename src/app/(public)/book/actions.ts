"use server";

import { createAdminClient } from "@/utils/supabase/admin";

export async function submitBookingEnquiry(data: any) {
  try {
    const supabase = createAdminClient();

    // 1. Find or create customer by phone
    let customerId = null;
    
    // CUSTOMER LOOKUP
    const { data: existingCustomer, error: customerSearchError } = await supabase
      .from("customers")
      .select("id")
      .eq("phone", data.phone)
      .maybeSingle();

    if (customerSearchError) {
      console.error("CUSTOMER LOOKUP FAILED", {
        message: customerSearchError.message,
        code: customerSearchError.code,
        details: customerSearchError.details,
        hint: customerSearchError.hint,
      });
      return { 
        success: false, 
        error: customerSearchError.message, 
        code: customerSearchError.code,
        details: customerSearchError.details,
        hint: customerSearchError.hint 
      };
    }

    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else {
      // CUSTOMER INSERT
      const customerPayload = {
        name: data.name,
        phone: data.phone,
        email: data.email,
      };
      
      console.log("CUSTOMER PAYLOAD", JSON.stringify(customerPayload, null, 2));
      
      const { data: newCustomer, error: createCustomerError } = await supabase
        .from("customers")
        .insert(customerPayload)
        .select()
        .single();

      if (createCustomerError) {
        console.error("CUSTOMER INSERT FAILED", {
          message: createCustomerError.message,
          code: createCustomerError.code,
          details: createCustomerError.details,
          hint: createCustomerError.hint,
        });
        return { 
          success: false, 
          error: createCustomerError.message, 
          code: createCustomerError.code,
          details: createCustomerError.details,
          hint: createCustomerError.hint 
        };
      }
      customerId = newCustomer.id;
    }

    // Parse budget to a numeric value for the database
    let budgetValue = null;
    if (data.budget === "Under ₹5,000") budgetValue = 5000;
    else if (data.budget === "₹5,000 - ₹15,000") budgetValue = 15000;
    else if (data.budget === "₹15,000 - ₹25,000") budgetValue = 25000;
    else if (data.budget === "₹25,000+") budgetValue = 30000;

    // Parse guests to an integer
    let guestsValue = 1;
    if (data.guests === "2-5") guestsValue = 5;
    else if (data.guests === "6-15") guestsValue = 15;
    else if (data.guests === "15+") guestsValue = 20;

    // ENQUIRY INSERT
    const enquiryPayload = {
      customer_id: customerId,
      customer_name: data.name,
      customer_phone: data.phone,
      customer_email: data.email,
      event_type: data.eventType,
      event_date: data.eventDate, // String YYYY-MM-DD
      venue: data.venue,
      guests: guestsValue,
      budget: budgetValue,
      mehendi_style: data.style,
      notes: data.notes || null,
      status: 'New'
    };
    
    console.log("ENQUIRY PAYLOAD", JSON.stringify(enquiryPayload, null, 2));
    
    const { data: enquiry, error: enquiryError } = await supabase
      .from("enquiries")
      .insert(enquiryPayload)
      .select()
      .single();

    if (enquiryError) {
      console.error("ENQUIRY INSERT FAILED", {
        message: enquiryError.message,
        code: enquiryError.code,
        details: enquiryError.details,
        hint: enquiryError.hint,
      });
      return { 
        success: false, 
        error: enquiryError.message, 
        code: enquiryError.code,
        details: enquiryError.details,
        hint: enquiryError.hint 
      };
    }

    // BOOKING INSERT
    const bookingPayload = {
      customer_id: customerId,
      enquiry_id: enquiry.id,
      event_date: data.eventDate,
      event_type: data.eventType,
      venue: data.venue,
      notes: data.notes || null,
      status: 'Pending',
      total_amount: 0,
      advance_amount: 0
    };
    
    console.log("BOOKING PAYLOAD", JSON.stringify(bookingPayload, null, 2));

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert(bookingPayload)
      .select()
      .single();

    if (bookingError) {
      console.error("BOOKING INSERT FAILED", {
        message: bookingError.message,
        code: bookingError.code,
        details: bookingError.details,
        hint: bookingError.hint,
      });
      return { 
        success: false, 
        error: bookingError.message, 
        code: bookingError.code,
        details: bookingError.details,
        hint: bookingError.hint 
      };
    }

    return { success: true, bookingId: booking.id };

  } catch (error: any) {
    console.error("UNEXPECTED ERROR", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}
