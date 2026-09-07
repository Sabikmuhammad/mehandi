import { NextResponse } from "next/server";
import { submitBookingEnquiry } from "@/app/(public)/book/actions";

export async function GET() {
  const dummyPayload = {
    name: "Diagnostic Test Customer",
    phone: "+919999999999",
    email: "diagnostic@example.com",
    eventType: "Diagnostic Event",
    eventDate: "2026-10-10",
    venue: "Test Venue",
    guests: "2-5",
    budget: "Under ₹5,000",
    style: "Traditional",
    notes: "Diagnostic Notes"
  };

  const result = await submitBookingEnquiry(dummyPayload);

  return NextResponse.json({
    result
  });
}
