"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  MessageSquare, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { name: "Portfolio", href: "/admin/portfolio", icon: ImageIcon },
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-primary text-secondary border-r border-primary/20 sticky top-0 h-screen">
        <div className="p-6">
          <Link href="/admin" className="flex flex-col items-start">
            <span className="font-serif text-2xl font-medium tracking-wide">
              RAIHANA
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-highlight">
              Admin Portal
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors ${
                  isActive 
                    ? "bg-highlight/20 text-highlight" 
                    : "text-secondary/70 hover:bg-secondary/10 hover:text-secondary"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-secondary/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm text-secondary/70 hover:bg-secondary/10 hover:text-secondary rounded transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-primary text-secondary z-30 flex items-center justify-between px-4">
        <Link href="/admin" className="font-serif text-xl tracking-wide">
          RAIHANA
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-primary pt-16 flex flex-col">
          <nav className="flex-1 px-4 py-8 space-y-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-4 rounded text-sm transition-colors ${
                    isActive 
                      ? "bg-highlight/20 text-highlight" 
                      : "text-secondary/70 hover:bg-secondary/10 hover:text-secondary"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen pt-16 md:pt-0 max-w-full overflow-hidden">
        <header className="hidden md:flex h-16 bg-white border-b border-gray-200 items-center justify-between px-8">
          <h1 className="text-lg font-medium text-gray-800">
            {sidebarLinks.find(l => l.href === pathname)?.name || "Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-highlight rounded-full flex items-center justify-center text-primary font-serif font-medium">
              R
            </div>
          </div>
        </header>
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
