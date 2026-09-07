import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, Edit, Calendar, MapPin, IndianRupee, FileText, CheckCircle, Clock, User } from "lucide-react";
import { redirect } from "next/navigation";

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const supabase = await createClient();

  let booking: any = null;

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          customers (*),
          payments (*)
        `)
        .eq("id", id)
        .single();
      
      if (error) throw error;
      booking = data;
    } else {
      // Mock data for preview when DB isn't connected
      booking = {
        id: "mock-booking-id",
        event_date: "2026-09-12",
        event_time: "17:00:00",
        event_type: "Bridal Mehendi",
        venue: "Taj Gateway, Mangaluru",
        service_details: "Full bridal mehendi up to elbows and feet up to ankles. Including portrait design.",
        total_amount: 8000,
        advance_amount: 3000,
        status: "Confirmed",
        notes: "Client requested specific lotus motifs.",
        created_at: new Date().toISOString(),
        customers: {
          id: "mock-customer-id",
          name: "Ayesha Khan",
          phone: "+91 9876543210",
          email: "ayesha@example.com"
        },
        payments: [
          {
            id: "pay-1",
            amount: 3000,
            payment_method: "UPI",
            payment_date: "2026-09-08T10:00:00Z",
            status: "Paid"
          }
        ]
      };
    }
  } catch (err: any) {
    console.error(err);
    redirect("/admin/bookings");
  }

  const balance = Number(booking.total_amount) - Number(booking.advance_amount);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between text-sm text-forest/60 mb-8">
        <Link href="/admin/bookings" className="hover:text-forest flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Bookings
        </Link>
        <button className="flex items-center gap-2 hover:text-forest transition-colors">
          <Edit className="w-4 h-4" /> Edit Booking
        </button>
      </div>

      <div className="bg-white border border-forest/10 rounded-sm shadow-sm overflow-hidden mb-8 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
        <div className="p-8 md:p-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-forest/10 pb-8 mb-8">
            <div>
              <div className="text-[10px] tracking-widest text-gold uppercase mb-2">
                {booking.status} BOOKING
              </div>
              <h1 className="text-4xl font-serif text-forest mb-2">
                {booking.customers?.name}
              </h1>
              <p className="text-forest/70 text-lg font-serif italic">
                {booking.event_type}
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-ivory/50 px-6 py-4 rounded-sm border border-forest/5 text-center min-w-[120px]">
                <div className="text-[10px] text-forest/50 uppercase tracking-widest mb-1">Total</div>
                <div className="text-xl font-medium text-forest">₹{booking.total_amount.toLocaleString('en-IN')}</div>
              </div>
              <div className="bg-ivory/50 px-6 py-4 rounded-sm border border-forest/5 text-center min-w-[120px]">
                <div className="text-[10px] text-forest/50 uppercase tracking-widest mb-1">Balance</div>
                <div className={`text-xl font-medium ${balance > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                  ₹{balance.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-forest font-medium mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold" /> Schedule
                </h3>
                <div className="pl-6 space-y-3">
                  <div>
                    <span className="text-xs text-forest/50 uppercase tracking-wider block">Date</span>
                    <span className="text-forest font-medium">{format(new Date(booking.event_date), 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                  <div>
                    <span className="text-xs text-forest/50 uppercase tracking-wider block">Time</span>
                    <span className="text-forest font-medium">{booking.event_time || 'To be decided'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-forest/50 uppercase tracking-wider block">Venue</span>
                    <span className="text-forest font-medium">{booking.venue || 'To be decided'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-forest font-medium mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-gold" /> Customer
                </h3>
                <div className="pl-6 space-y-3">
                  <div>
                    <span className="text-xs text-forest/50 uppercase tracking-wider block">Phone</span>
                    <span className="text-forest font-medium">{booking.customers?.phone || '—'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-forest/50 uppercase tracking-wider block">Email</span>
                    <span className="text-forest font-medium">{booking.customers?.email || '—'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-forest font-medium mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gold" /> Service Details
                </h3>
                <div className="pl-6 text-sm text-forest/80 leading-relaxed bg-ivory/30 p-4 rounded border border-forest/5">
                  {booking.service_details || 'No specific service details recorded.'}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-forest font-medium mb-4 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-gold" /> Payment History
                </h3>
                <div className="pl-6 space-y-3">
                  {booking.payments && booking.payments.length > 0 ? (
                    booking.payments.map((payment: any) => (
                      <div key={payment.id} className="flex justify-between items-center text-sm border-b border-forest/5 pb-2">
                        <div>
                          <span className="text-forest font-medium">₹{payment.amount.toLocaleString('en-IN')}</span>
                          <span className="text-xs text-forest/50 ml-2 bg-ivory px-2 py-0.5 rounded">{payment.payment_method}</span>
                        </div>
                        <div className="text-forest/60 text-xs text-right">
                          {format(new Date(payment.payment_date), 'MMM d, yyyy')}
                          <div className="text-green-600 flex items-center gap-1 justify-end mt-0.5">
                            <CheckCircle className="w-3 h-3" /> {payment.status}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-forest/50 italic">No payments recorded yet.</div>
                  )}
                  
                  {balance > 0 && (
                    <button className="w-full mt-2 py-2 border border-forest/20 text-forest text-xs uppercase tracking-widest hover:bg-forest hover:text-ivory transition-colors rounded">
                      Record Payment
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
