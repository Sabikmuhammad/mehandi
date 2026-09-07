import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import Link from "next/link";
import { Search, Filter, ArrowRight } from "lucide-react";

export default async function EnquiriesPage() {
  const supabase = await createClient();

  let enquiries: any[] = [];
  let errorMsg = null;

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      if (data) enquiries = data;
    }
  } catch (err: any) {
    errorMsg = err.message;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Contacted': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Quoted': return 'bg-gold/10 text-gold border-gold/20';
      case 'Advance Pending': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Confirmed': return 'bg-green-50 text-green-700 border-green-200';
      case 'Completed': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-forest mb-1">Enquiries</h1>
          <p className="text-sm text-forest/60">Manage all incoming requests and leads.</p>
        </div>
        
        <Link href="/admin/enquiries/new" className="px-5 py-2.5 bg-forest text-ivory text-xs font-medium uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-colors shadow-sm rounded-sm">
          + New Enquiry
        </Link>
      </div>

      <div className="bg-white border border-forest/10 rounded-sm shadow-sm">
        <div className="p-4 border-b border-forest/10 flex flex-wrap gap-4 items-center justify-between bg-ivory/30">
          
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-forest/40" />
              <input 
                type="text" 
                placeholder="Search by name, email or phone..." 
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
            Error loading enquiries: {errorMsg}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-ivory/50 text-forest/50 text-[10px] uppercase tracking-widest border-b border-forest/5">
                <th className="p-4 font-medium pl-6">Customer</th>
                <th className="p-4 font-medium">Event Type</th>
                <th className="p-4 font-medium">Event Date</th>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 font-medium">Received On</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5">
              {enquiries.length === 0 && !errorMsg ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-forest/50 text-sm">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-ivory/50 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="text-sm font-medium text-forest">{enq.customer_name}</div>
                      <div className="text-xs text-forest/50">{enq.customer_phone || enq.customer_email || 'No contact info'}</div>
                    </td>
                    <td className="p-4 text-sm text-forest/70">{enq.event_type}</td>
                    <td className="p-4 text-sm text-forest/70">
                      {enq.event_date ? format(new Date(enq.event_date), 'MMM d, yyyy') : 'TBD'}
                    </td>
                    <td className="p-4 text-sm text-forest/70">{enq.venue || 'TBD'}</td>
                    <td className="p-4 text-sm text-forest/70">
                      {format(new Date(enq.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-[10px] font-medium tracking-wide uppercase border ${getStatusColor(enq.status)}`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <Link href={`/admin/enquiries/${enq.id}`} className="inline-flex items-center justify-center p-2 text-forest/40 hover:text-gold hover:bg-gold/10 rounded transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
