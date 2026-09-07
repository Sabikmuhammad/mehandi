import { createClient } from "@/utils/supabase/server";
import { 
  Users, 
  Calendar, 
  IndianRupee, 
  Clock, 
  Plus,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { format, isAfter, subDays, startOfMonth } from "date-fns";
import RevenueChart from "./components/RevenueChart";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Try to fetch real data, gracefully fallback to 0/empty if Supabase is not configured yet
  let stats = {
    totalEnquiries: 0,
    pendingEnquiries: 0,
    upcomingBookings: 0,
    monthlyRevenue: 0,
    outstanding: 0,
  };

  let upcomingBookingsData: any[] = [];
  let recentEnquiriesData: any[] = [];
  let isDbConnected = false;

  try {
    // Check if we actually have a URL configured to prevent console spam
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      isDbConnected = true;
      
      const now = new Date();
      const monthStart = startOfMonth(now);

      // 1. Total Enquiries this month
      const { count: totalEnquiries } = await supabase
        .from("enquiries")
        .select("*", { count: "exact", head: true })
        .gte("created_at", monthStart.toISOString());
      if (totalEnquiries) stats.totalEnquiries = totalEnquiries;

      // 2. Pending Enquiries (New)
      const { count: pendingEnquiries } = await supabase
        .from("enquiries")
        .select("*", { count: "exact", head: true })
        .eq("status", "New");
      if (pendingEnquiries) stats.pendingEnquiries = pendingEnquiries;

      // 3. Upcoming Bookings (Next 30 days)
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      const { count: upcomingBookings } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .gte("event_date", now.toISOString())
        .lte("event_date", thirtyDaysFromNow.toISOString())
        .in("status", ["Pending", "Confirmed"]);
      if (upcomingBookings) stats.upcomingBookings = upcomingBookings;

      // 4. Monthly Revenue (Current Month)
      const { data: payments } = await supabase
        .from("payments")
        .select("amount")
        .gte("payment_date", monthStart.toISOString())
        .eq("status", "Paid");
      if (payments) {
        stats.monthlyRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);
      }

      // 5. Outstanding Payments (Bookings where advance_amount < total_amount)
      // This is a simplified query; in reality we'd calculate balance
      const { data: outstandingBookings } = await supabase
        .from("bookings")
        .select("total_amount, advance_amount")
        .in("status", ["Pending", "Confirmed"]);
      if (outstandingBookings) {
        stats.outstanding = outstandingBookings.reduce((sum, b) => {
          const balance = Number(b.total_amount) - Number(b.advance_amount);
          return sum + (balance > 0 ? balance : 0);
        }, 0);
      }

      // Fetch Upcoming Bookings List
      const { data: upcoming } = await supabase
        .from("bookings")
        .select(`
          id, event_date, event_time, event_type, venue, status, total_amount,
          customers ( name )
        `)
        .gte("event_date", now.toISOString())
        .order("event_date", { ascending: true })
        .limit(5);
      if (upcoming) upcomingBookingsData = upcoming;

      // Fetch Recent Enquiries List
      const { data: recent } = await supabase
        .from("enquiries")
        .select(`id, customer_name, event_type, event_date, venue, created_at, status`)
        .order("created_at", { ascending: false })
        .limit(5);
      if (recent) recentEnquiriesData = recent;
    }
  } catch (error) {
    console.error("Database connection failed or not setup yet:", error);
  }

  const statCards = [
    { name: "Total Enquiries", value: stats.totalEnquiries, icon: Users, subtext: "This month" },
    { name: "Pending Enquiries", value: stats.pendingEnquiries, icon: Clock, subtext: "Need response", highlight: stats.pendingEnquiries > 0 },
    { name: "Upcoming Bookings", value: stats.upcomingBookings, icon: Calendar, subtext: "Next 30 days" },
    { name: "Monthly Revenue", value: `₹${stats.monthlyRevenue.toLocaleString('en-IN')}`, icon: IndianRupee, subtext: "Current month" },
    { name: "Outstanding", value: `₹${stats.outstanding.toLocaleString('en-IN')}`, icon: AlertCircle, subtext: "Pending payments", highlight: stats.outstanding > 0 },
  ];

  return (
    <div className="space-y-10">
      {!isDbConnected && (
        <div className="bg-red-50 text-red-800 p-4 rounded border border-red-200 text-sm">
          <strong>Database Not Connected:</strong> Please configure your <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in `.env.local` to view real data.
        </div>
      )}

      {/* Header & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif text-forest mb-2">Good morning, Raihana.</h1>
          <p className="text-forest/60">Here's what's happening with your mehendi business today.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/calendar" className="px-5 py-2.5 bg-white border border-forest/10 text-forest text-xs font-medium uppercase tracking-widest hover:border-gold hover:text-gold transition-colors shadow-sm rounded-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Check Calendar
          </Link>
          <Link href="/admin/enquiries/new" className="px-5 py-2.5 bg-white border border-forest/10 text-forest text-xs font-medium uppercase tracking-widest hover:border-gold hover:text-gold transition-colors shadow-sm rounded-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Enquiry
          </Link>
          <Link href="/admin/bookings/new" className="px-5 py-2.5 bg-forest text-ivory text-xs font-medium uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-colors shadow-sm rounded-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Booking
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className={`bg-white p-6 rounded-sm border shadow-sm flex flex-col justify-between ${
                stat.highlight ? "border-gold/50 shadow-gold/5" : "border-forest/5"
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-2 rounded-sm ${stat.highlight ? 'bg-gold/10 text-gold' : 'bg-forest/5 text-forest'}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-serif text-forest mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-forest/80">{stat.name}</p>
                <p className="text-xs text-forest/50 mt-1">{stat.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Revenue Chart */}
          <div className="bg-white rounded-sm border border-forest/5 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-serif text-forest">Revenue Overview</h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-2xl font-medium text-forest">₹{stats.monthlyRevenue.toLocaleString('en-IN')}</span>
                  <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    <TrendingUp className="w-3 h-3 mr-1" /> +0% vs last month
                  </span>
                </div>
              </div>
              <select defaultValue="30 days" className="bg-ivory border border-forest/10 text-xs text-forest px-3 py-1.5 rounded outline-none focus:border-gold">
                <option value="7 days">7 days</option>
                <option value="30 days">30 days</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="12 months">12 months</option>
              </select>
            </div>
            
            <div className="h-[300px] w-full">
               <RevenueChart />
            </div>
          </div>

          {/* Recent Enquiries */}
          <div className="bg-white rounded-sm border border-forest/5 shadow-sm">
            <div className="p-6 border-b border-forest/5 flex justify-between items-center">
              <h2 className="text-lg font-serif text-forest">Recent Enquiries</h2>
              <Link href="/admin/enquiries" className="text-xs uppercase tracking-widest text-gold hover:text-forest transition-colors flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-ivory/50 text-forest/50 text-[10px] uppercase tracking-widest">
                    <th className="p-4 font-medium">Customer</th>
                    <th className="p-4 font-medium">Event</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Location</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/5">
                  {recentEnquiriesData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-forest/50 text-sm">
                        No recent enquiries.
                      </td>
                    </tr>
                  ) : (
                    recentEnquiriesData.map((enq) => (
                      <tr key={enq.id} className="hover:bg-ivory/50 transition-colors group cursor-pointer">
                        <td className="p-4 text-sm font-medium text-forest group-hover:text-gold transition-colors">{enq.customer_name}</td>
                        <td className="p-4 text-sm text-forest/70">{enq.event_type}</td>
                        <td className="p-4 text-sm text-forest/70">{enq.event_date ? format(new Date(enq.event_date), 'MMM d, yyyy') : 'TBD'}</td>
                        <td className="p-4 text-sm text-forest/70">{enq.venue || 'TBD'}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-medium tracking-wide uppercase ${
                            enq.status === 'New' ? 'bg-blue-50 text-blue-700' :
                            enq.status === 'Quoted' ? 'bg-gold/10 text-gold' :
                            'bg-green-50 text-green-700'
                          }`}>
                            {enq.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Area (Right 1 col) */}
        <div className="space-y-8">
          
          {/* Upcoming Bookings */}
          <div className="bg-white rounded-sm border border-forest/5 shadow-sm flex flex-col h-full">
            <div className="p-6 border-b border-forest/5 flex justify-between items-center">
              <h2 className="text-lg font-serif text-forest">Upcoming Bookings</h2>
            </div>
            
            <div className="p-6 flex-1 flex flex-col gap-4">
              {upcomingBookingsData.length === 0 ? (
                <div className="text-center py-10 flex flex-col items-center justify-center h-full">
                  <div className="w-12 h-12 rounded-full bg-forest/5 flex items-center justify-center mb-4 text-forest/30">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-forest mb-1">Your calendar is clear</p>
                  <p className="text-xs text-forest/50 mb-6">No upcoming bookings in the next 30 days.</p>
                  <Link href="/admin/bookings/new" className="px-4 py-2 border border-forest text-forest text-xs uppercase tracking-widest hover:bg-forest hover:text-ivory transition-colors">
                    Create Booking
                  </Link>
                </div>
              ) : (
                <>
                  {upcomingBookingsData.map((booking) => (
                    <div key={booking.id} className="flex gap-4 items-start p-4 bg-ivory/50 rounded-sm border border-forest/5 hover:border-gold/30 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-white rounded border border-forest/10 flex flex-col items-center justify-center shrink-0 shadow-sm">
                        <span className="text-[10px] font-medium text-forest/50 uppercase leading-none mb-1">
                          {format(new Date(booking.event_date), 'MMM')}
                        </span>
                        <span className="text-sm font-bold text-forest leading-none">
                          {format(new Date(booking.event_date), 'dd')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-forest group-hover:text-gold transition-colors">
                          {booking.customers?.name} • {booking.event_type}
                        </h4>
                        <div className="flex items-center gap-3 mt-2 text-xs text-forest/60">
                          {booking.event_time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {booking.event_time}
                            </span>
                          )}
                          <span>{booking.venue || 'Venue TBD'}</span>
                        </div>
                        <div className="mt-2 text-xs font-medium text-forest">
                          ₹{booking.total_amount.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-auto pt-4">
                    <Link href="/admin/bookings" className="flex justify-center items-center gap-2 w-full py-3 bg-ivory text-forest text-xs font-medium uppercase tracking-widest hover:bg-forest/5 transition-colors rounded border border-forest/10">
                      View All Bookings <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
