import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Calendar, User, MapPin, IndianRupee, FileText } from "lucide-react";
import { redirect } from "next/navigation";

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const supabase = await createClient();

  let enq: any = null;

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      enq = data;
    } else {
      // Mock data for preview when DB isn't connected
      enq = {
        id: "mock-id",
        customer_name: "Mock Customer",
        customer_phone: "+91 9876543210",
        customer_email: "mock@example.com",
        event_type: "Bridal Mehendi",
        event_date: "2026-09-12",
        event_time: "10:00:00",
        venue: "Taj Gateway, Mangaluru",
        guests: 15,
        budget: 10000,
        mehendi_style: "Intricate Traditional",
        status: "New",
        notes: "Wants full arm mehendi and feet.",
        quoted_amount: null,
        created_at: new Date().toISOString()
      };
    }
  } catch (err: any) {
    console.error(err);
    redirect("/admin/enquiries");
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

  const whatsappMessage = encodeURIComponent(`Hi ${enq.customer_name}, this is Raihana from Raihana Mehendi Artistry. Thank you for your enquiry regarding your ${enq.event_type} on ${enq.event_date ? format(new Date(enq.event_date), 'dd MMM') : 'your upcoming date'}.`);
  const whatsappUrl = `https://wa.me/${enq.customer_phone?.replace(/\D/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Bar */}
      <div className="flex items-center gap-4 text-sm text-forest/60">
        <Link href="/admin/enquiries" className="hover:text-forest flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Enquiries
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif text-forest mb-2 flex items-center gap-4">
            {enq.customer_name}
            <span className={`inline-flex items-center px-3 py-1 rounded-sm text-[10px] font-medium tracking-wide uppercase border ${getStatusColor(enq.status)}`}>
              {enq.status}
            </span>
          </h1>
          <p className="text-sm text-forest/60">
            Received {format(new Date(enq.created_at), 'MMMM d, yyyy h:mm a')}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {enq.customer_phone && (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-green-50 text-green-700 border border-green-200 text-xs font-medium uppercase tracking-widest hover:bg-green-100 transition-colors shadow-sm rounded-sm flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          )}
          <button className="px-5 py-2.5 bg-white border border-forest/10 text-forest text-xs font-medium uppercase tracking-widest hover:border-gold hover:text-gold transition-colors shadow-sm rounded-sm">
            Create Quotation
          </button>
          <button className="px-5 py-2.5 bg-forest text-ivory text-xs font-medium uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-colors shadow-sm rounded-sm">
            Convert to Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Event Details */}
          <div className="bg-white border border-forest/10 rounded-sm shadow-sm overflow-hidden">
            <div className="p-4 border-b border-forest/10 bg-ivory/30">
              <h2 className="text-xs uppercase tracking-widest text-forest font-medium">Event Details</h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-forest/50 uppercase tracking-widest mb-1 flex items-center gap-1">
                  <StarIcon className="w-3 h-3" /> Event Type
                </p>
                <p className="font-medium text-forest">{enq.event_type || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-forest/50 uppercase tracking-widest mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Date & Time
                </p>
                <p className="font-medium text-forest">
                  {enq.event_date ? format(new Date(enq.event_date), 'MMMM d, yyyy') : '—'}
                  {enq.event_time && ` • ${enq.event_time}`}
                </p>
              </div>
              <div>
                <p className="text-xs text-forest/50 uppercase tracking-widest mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Venue
                </p>
                <p className="font-medium text-forest">{enq.venue || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-forest/50 uppercase tracking-widest mb-1 flex items-center gap-1">
                  <UsersIcon className="w-3 h-3" /> Guests
                </p>
                <p className="font-medium text-forest">{enq.guests || '—'}</p>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white border border-forest/10 rounded-sm shadow-sm overflow-hidden">
            <div className="p-4 border-b border-forest/10 bg-ivory/30">
              <h2 className="text-xs uppercase tracking-widest text-forest font-medium">Preferences & Notes</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <p className="text-xs text-forest/50 uppercase tracking-widest mb-1">Mehendi Style / Coverage</p>
                <p className="font-medium text-forest">{enq.mehendi_style || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-forest/50 uppercase tracking-widest mb-2">Customer Notes</p>
                <div className="p-4 bg-ivory/50 border border-forest/5 rounded text-sm text-forest/80 italic">
                  {enq.notes ? `"${enq.notes}"` : 'No additional notes provided.'}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          
          {/* Customer Card */}
          <div className="bg-white border border-forest/10 rounded-sm shadow-sm overflow-hidden">
            <div className="p-4 border-b border-forest/10 bg-ivory/30">
              <h2 className="text-xs uppercase tracking-widest text-forest font-medium">Customer Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center text-gold font-serif text-lg shrink-0">
                  {enq.customer_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-medium text-forest">{enq.customer_name}</h3>
                  {enq.customer_id && (
                    <Link href={`/admin/customers/${enq.customer_id}`} className="text-[10px] text-gold uppercase tracking-widest hover:underline">
                      View Profile
                    </Link>
                  )}
                </div>
              </div>
              <div className="pt-2 space-y-3">
                {enq.customer_phone && (
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-4 h-4 text-forest/40 shrink-0 mt-0.5" />
                    <span className="text-sm text-forest">{enq.customer_phone}</span>
                  </div>
                )}
                {enq.customer_email && (
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-forest/40 shrink-0 mt-0.5" />
                    <span className="text-sm text-forest">{enq.customer_email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Info */}
          <div className="bg-white border border-forest/10 rounded-sm shadow-sm overflow-hidden">
            <div className="p-4 border-b border-forest/10 bg-ivory/30">
              <h2 className="text-xs uppercase tracking-widest text-forest font-medium">Financials</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs text-forest/50 uppercase tracking-widest mb-1 flex items-center gap-1">
                  Budget
                </p>
                <p className="font-medium text-forest text-lg">
                  {enq.budget ? `₹${enq.budget.toLocaleString('en-IN')}` : 'Not specified'}
                </p>
              </div>
              <div>
                <p className="text-xs text-forest/50 uppercase tracking-widest mb-1 flex items-center gap-1">
                  Quoted Amount
                </p>
                <p className="font-medium text-forest text-lg">
                  {enq.quoted_amount ? `₹${enq.quoted_amount.toLocaleString('en-IN')}` : '—'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Simple icons for layout
function StarIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
  )
}

function UsersIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
  )
}
