import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import Link from "next/link";
import { Search, Filter, Mail, Phone, ExternalLink } from "lucide-react";

export default async function CustomersPage() {
  const supabase = await createClient();

  let customers: any[] = [];
  let errorMsg = null;

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { data, error } = await supabase
        .from("customers")
        .select(`
          *,
          bookings(count)
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      if (data) customers = data;
    }
  } catch (err: any) {
    errorMsg = err.message;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-forest mb-1">Customers</h1>
          <p className="text-sm text-forest/60">Your client database and history.</p>
        </div>
      </div>

      <div className="bg-white border border-forest/10 rounded-sm shadow-sm">
        <div className="p-4 border-b border-forest/10 flex flex-wrap gap-4 items-center justify-between bg-ivory/30">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-forest/40" />
              <input 
                type="text" 
                placeholder="Search customers..." 
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
            Error loading customers: {errorMsg}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-ivory/50 text-forest/50 text-[10px] uppercase tracking-widest border-b border-forest/5">
                <th className="p-4 font-medium pl-6">Customer</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Added On</th>
                <th className="p-4 font-medium">Total Bookings</th>
                <th className="p-4 font-medium text-right pr-6">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5">
              {customers.length === 0 && !errorMsg ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-forest/50 text-sm">
                    No customers found.
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-ivory/50 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-forest/5 flex items-center justify-center text-forest font-serif font-medium border border-forest/10">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-sm font-medium text-forest">{customer.name}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-xs text-forest/70">
                        {customer.phone && (
                          <div className="flex items-center gap-1.5 hover:text-forest transition-colors">
                            <Phone className="w-3 h-3" /> {customer.phone}
                          </div>
                        )}
                        {customer.email && (
                          <div className="flex items-center gap-1.5 hover:text-forest transition-colors">
                            <Mail className="w-3 h-3" /> {customer.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-forest/70">
                      {format(new Date(customer.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="p-4 text-sm font-medium text-forest">
                      {customer.bookings[0]?.count || 0}
                    </td>
                    <td className="p-4 text-right pr-6">
                      <Link href={`/admin/customers/${customer.id}`} className="inline-flex items-center justify-center p-2 text-forest/40 hover:text-gold hover:bg-gold/10 rounded transition-colors">
                        <ExternalLink className="w-4 h-4" />
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
