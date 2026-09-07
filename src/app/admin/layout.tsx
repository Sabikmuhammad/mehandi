"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  MessageSquare,
  CalendarCheck,
  Calendar,
  Users,
  FileText,
  IndianRupee,
  Image as ImageIcon,
  Sparkles,
  Package,
  Star,
  Camera,
  Clock,
  Settings,
  Globe,
  LogOut,
  Menu,
  X,
  Bell,
  Search
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarGroups = [
  {
    title: "Main",
    links: [
      { name: "Overview", href: "/admin", icon: LayoutDashboard },
      { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
      { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
      { name: "Calendar", href: "/admin/calendar", icon: Calendar },
      { name: "Customers", href: "/admin/customers", icon: Users },
    ]
  },
  {
    title: "Financials",
    links: [
      { name: "Quotations", href: "/admin/quotations", icon: FileText },
      { name: "Payments", href: "/admin/payments", icon: IndianRupee },
    ]
  },
  {
    title: "Content",
    links: [
      { name: "Portfolio", href: "/admin/portfolio", icon: ImageIcon },
      { name: "Services", href: "/admin/services", icon: Sparkles },
      { name: "Packages", href: "/admin/packages", icon: Package },
      { name: "Testimonials", href: "/admin/testimonials", icon: Star },
      { name: "Instagram", href: "/admin/instagram", icon: Camera },
    ]
  },
  {
    title: "Operations",
    links: [
      { name: "Availability", href: "/admin/availability", icon: Clock },
    ]
  }
];

const bottomLinks = [
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Overview';
    const allLinks = [...sidebarGroups.flatMap(g => g.links), ...bottomLinks];
    const match = allLinks.find(l => pathname.startsWith(l.href) && l.href !== '/admin');
    return match ? match.name : 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-forest text-ivory border-r border-forest/10 sticky top-0 h-screen overflow-y-auto custom-scrollbar">
        <div className="p-8 pb-4 sticky top-0 bg-forest z-10">
          <Link href="/admin" className="flex flex-col items-start">
            <span className="font-serif text-2xl font-medium tracking-wide leading-none mb-2">
              RAIHANA
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-gold">
              Mehendi Artistry
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-8">
          {sidebarGroups.map((group, i) => (
            <div key={i} className="space-y-2">
              {group.links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/admin');
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded text-sm transition-all duration-300 ${
                      isActive 
                        ? "bg-gold/10 text-gold font-medium" 
                        : "text-ivory/70 hover:bg-ivory/5 hover:text-ivory"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
              {i < sidebarGroups.length - 1 && (
                <div className="mx-4 h-px bg-ivory/5 my-4"></div>
              )}
            </div>
          ))}

          <div className="mx-4 h-px bg-ivory/5 my-4"></div>
          
          <div className="space-y-2">
            {bottomLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded text-sm transition-all duration-300 ${
                    isActive 
                      ? "bg-gold/10 text-gold font-medium" 
                      : "text-ivory/70 hover:bg-ivory/5 hover:text-ivory"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </nav>
        
        <div className="p-4 mt-auto border-t border-ivory/10 sticky bottom-0 bg-forest">
          <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-2 w-full text-left text-sm text-ivory/70 hover:bg-ivory/5 hover:text-ivory rounded transition-colors mb-1">
            <Globe className="w-4 h-4" />
            View Website
          </Link>
          <form action="/auth/signout" method="post">
            <button type="submit" className="flex items-center gap-3 px-4 py-2 w-full text-left text-sm text-ivory/70 hover:bg-red-500/10 hover:text-red-400 rounded transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-forest text-ivory z-40 flex items-center justify-between px-6 border-b border-forest/10">
        <Link href="/admin" className="font-serif text-xl tracking-wide">
          RAIHANA
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-ivory hover:text-gold transition-colors">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="lg:hidden fixed inset-0 z-30 bg-forest pt-16 flex flex-col h-screen overflow-y-auto"
          >
            <nav className="flex-1 px-4 py-8 space-y-6">
              {sidebarGroups.map((group, i) => (
                <div key={i} className="space-y-1">
                  {group.links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/admin');
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-4 px-4 py-3 rounded text-sm transition-all duration-300 ${
                          isActive 
                            ? "bg-gold/10 text-gold font-medium" 
                            : "text-ivory/70 hover:bg-ivory/5 hover:text-ivory"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {link.name}
                      </Link>
                    );
                  })}
                  {i < sidebarGroups.length - 1 && (
                    <div className="mx-4 h-px bg-ivory/10 my-4"></div>
                  )}
                </div>
              ))}
            </nav>
            
            <div className="p-6 mt-auto border-t border-ivory/10 bg-forest">
              <form action="/auth/signout" method="post">
                <button type="submit" className="flex items-center justify-center gap-3 w-full py-3 bg-ivory/5 text-ivory hover:bg-red-500/10 hover:text-red-400 rounded transition-colors text-sm font-medium">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen pt-16 lg:pt-0 max-w-full overflow-hidden bg-ivory">
        
        {/* Topbar */}
        <header className="hidden lg:flex h-20 bg-ivory border-b border-forest/5 items-center justify-between px-10 sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-serif text-forest mb-1">
              {getPageTitle()}
            </h1>
            <p className="text-xs text-forest/50 font-medium tracking-wide uppercase">
              {currentDate}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group hidden xl:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-forest/40 group-focus-within:text-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 w-64 bg-white border border-forest/10 rounded text-sm text-forest focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-forest/30 shadow-sm"
              />
            </div>
            
            <button className="relative p-2 text-forest/60 hover:text-forest transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-ivory"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-forest/10 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-medium text-forest group-hover:text-gold transition-colors">Raihana</p>
                <p className="text-[10px] text-forest/50 uppercase tracking-widest">Admin</p>
              </div>
              <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center text-gold font-serif font-medium border border-forest/20 shadow-sm group-hover:border-gold/50 transition-colors">
                R
              </div>
            </div>
          </div>
        </header>
        
        {/* Mobile Page Title */}
        <div className="lg:hidden px-6 py-6 border-b border-forest/5 bg-ivory">
          <h1 className="text-2xl font-serif text-forest mb-1">
            {getPageTitle()}
          </h1>
          <p className="text-xs text-forest/50 font-medium tracking-wide uppercase">
            {currentDate}
          </p>
        </div>

        <div className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
