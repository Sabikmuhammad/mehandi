import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import Link from "next/link";
import { Search, Filter, ArrowRight } from "lucide-react";

export default async function BookingsPage() {
  const supabase = await createClient();

  let bookings: any[] = [];
  let errorMsg = null;

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id, event_date, event_time, event_type, venue, status, total_amount, advance_amount,
          customers ( name, phone )
        `)
        .order("event_date", { ascending: true });
      
      if (error) throw error;
      if (data) bookings = data;
    }
  } catch (err: any) {
    errorMsg = err.message;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Confirmed': return 'bg-green-50 text-green-700 border-green-200';
      case 'Completed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-forest mb-1">Bookings</h1>
          <p className="text-sm text-forest/60">Manage your confirmed events and schedule.</p>
        </div>
        
        <Link href="/admin/bookings/new" className="px-5 py-2.5 bg-forest text-ivory text-xs font-medium uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-colors shadow-sm rounded-sm">
          + New Booking
        </Link>
      </div>

      <div className="bg-white border border-forest/10 rounded-sm shadow-sm">
        <div className="p-4 border-b border-forest/10 flex flex-wrap gap-4 items-center justify-between bg-ivory/30">
          
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-forest/40" />
              <input 
                type="text" 
                placeholder="Search by customer name or event..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-forest/10 rounded text-sm text-forest focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            
            <button className="px-4 py-2 border border-forest/10 rounded text-sm text-forest hover:bg-forest/5 flex items-center gap-2 transition-colors bg-white">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          
        </div>

        {errorMsg && (
          <div className="p-6 text-red-600 bg-red-50 text-sm">
            Error loading bookings: {errorMsg}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-ivory/50 text-forest/50 text-[10px] uppercase tracking-widest border-b border-forest/5">
                <th className="p-4 font-medium pl-6">Date</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Event</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Balance</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5">
              {bookings.length === 0 && !errorMsg ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-forest/50 text-sm">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => {
                  const balance = Number(booking.total_amount) - Number(booking.advance_amount);
                  
                  return (
                    <tr key={booking.id} className="hover:bg-ivory/50 transition-colors group">
                      <td className="p-4 pl-6">
                        <div className="text-sm font-medium text-forest">
                          {format(new Date(booking.event_date), 'MMM d, yyyy')}
                        </div>
                        <div className="text-xs text-forest/50">{booking.event_time || 'TBD'}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-forest">{booking.customers?.name || 'Unknown'}</div>
                        <div className="text-xs text-forest/50">{booking.customers?.phone || ''}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-forest">{booking.event_type}</div>
                        <div className="text-xs text-forest/50">{booking.venue || 'TBD'}</div>
                      </td>
                      <td className="p-4 text-sm font-medium text-forest">
                        ₹{Number(booking.total_amount).toLocaleString('en-IN')}
                      </td>
                      <td className="p-4 text-sm">
                        {balance > 0 ? (
                          <span className="text-orange-600 font-medium">₹{balance.toLocaleString('en-IN')}</span>
                        ) : (
                          <span className="text-green-600 font-medium flex items-center gap-1">Paid</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-[10px] font-medium tracking-wide uppercase border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4 text-right pr-6">
                        <Link href={`/admin/bookings/${booking.id}`} className="inline-flex items-center justify-center p-2 text-forest/40 hover:text-gold hover:bg-gold/10 rounded transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
