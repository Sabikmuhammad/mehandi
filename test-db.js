const { createClient } = require('@supabase/supabase-js');

async function run() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  const supabase = createClient(url, key);

  console.log("Looking up customer...");
  const { data: existingCustomer, error: customerSearchError } = await supabase
    .from("customers")
    .select("id")
    .eq("phone", "+919999999999")
    .maybeSingle();
    
  if (customerSearchError) {
    console.error("CUSTOMER LOOKUP FAILED", customerSearchError);
    return;
  }
  
  let customerId = existingCustomer ? existingCustomer.id : null;
  if (!customerId) {
    console.log("Creating customer...");
    const { data: newCustomer, error: createCustomerError } = await supabase
      .from("customers")
      .insert({ name: "Diagnostic User", phone: "+919999999999", email: "diag@test.com" })
      .select()
      .single();
    if (createCustomerError) {
      console.error("CUSTOMER INSERT FAILED", createCustomerError);
      return;
    }
    customerId = newCustomer.id;
  }
  console.log("Customer ID:", customerId);

  console.log("Creating enquiry...");
  const enquiryPayload = {
    customer_id: customerId,
    customer_name: "Diagnostic User",
    customer_phone: "+919999999999",
    customer_email: "diag@test.com",
    event_type: "Test",
    event_date: "2026-10-10",
    venue: "Test Venue",
    guests: 5,
    budget: 5000,
    mehendi_style: "Traditional",
    notes: "Diagnostic Notes",
    status: 'New'
  };
  
  const { data: enquiry, error: enquiryError } = await supabase
    .from("enquiries")
    .insert(enquiryPayload)
    .select()
    .single();
    
  if (enquiryError) {
    console.error("ENQUIRY INSERT FAILED", enquiryError);
    return;
  }
  console.log("Enquiry ID:", enquiry.id);
  
  console.log("Creating booking...");
  const bookingPayload = {
    customer_id: customerId,
    enquiry_id: enquiry.id,
    event_date: "2026-10-10",
    event_type: "Test",
    venue: "Test Venue",
    notes: "Diagnostic Notes",
    status: 'Pending',
    total_amount: 0,
    advance_amount: 0
  };
  
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert(bookingPayload)
    .select()
    .single();
    
  if (bookingError) {
    console.error("BOOKING INSERT FAILED", bookingError);
    return;
  }
  console.log("Booking ID:", booking.id);
}
run();
