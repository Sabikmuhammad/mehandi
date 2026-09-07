"use client";

import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";

// In a real implementation, these would be fetched via React Server Components or SWR/React Query
const mockBookings = [
  { id: 1, date: new Date(2026, 8, 12), title: "Ayesha - Bridal", status: "Confirmed" },
  { id: 2, date: new Date(2026, 8, 15), title: "Zoya - Party", status: "Pending" },
  { id: 3, date: new Date(2026, 8, 22), title: "Fatima - Bridal", status: "Confirmed" },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // Defaulting to Sept 2026 for the prototype

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const days = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-forest mb-1">Calendar</h1>
          <p className="text-sm text-forest/60">Overview of your scheduled events.</p>
        </div>
        
        <Link href="/admin/bookings/new" className="px-5 py-2.5 bg-forest text-ivory text-xs font-medium uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-colors shadow-sm rounded-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Booking
        </Link>
      </div>

      <div className="bg-white border border-forest/10 rounded-sm shadow-sm overflow-hidden">
        {/* Calendar Header */}
        <div className="p-4 border-b border-forest/10 bg-ivory/30 flex items-center justify-between">
          <h2 className="text-lg font-serif text-forest">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2 border border-forest/10 rounded hover:bg-forest/5 text-forest transition-colors bg-white">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={nextMonth} className="p-2 border border-forest/10 rounded hover:bg-forest/5 text-forest transition-colors bg-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 border-b border-forest/10 bg-ivory/10">
          {weekDays.map((day) => (
            <div key={day} className="py-3 text-center text-[10px] font-medium uppercase tracking-widest text-forest/50">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 border-l border-forest/5">
          {days.map((day, idx) => {
            const isCurrentMonth = isSameMonth(day, monthStart);
            const dayBookings = mockBookings.filter(b => isSameDay(b.date, day));
            const isToday = isSameDay(day, new Date());

            return (
              <div 
                key={day.toString()} 
                className={`min-h-[120px] p-2 border-b border-r border-forest/5 transition-colors hover:bg-ivory/30 ${
                  !isCurrentMonth ? "bg-gray-50/50 opacity-50" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                    isToday ? "bg-gold text-white" : "text-forest"
                  }`}>
                    {format(day, dateFormat)}
                  </span>
                </div>
                
                <div className="mt-2 space-y-1">
                  {dayBookings.map(booking => (
                    <Link 
                      key={booking.id} 
                      href={`/admin/bookings/${booking.id}`}
                      className={`block px-2 py-1 text-xs truncate rounded border ${
                        booking.status === 'Confirmed' 
                          ? 'bg-green-50 border-green-100 text-green-700'
                          : 'bg-orange-50 border-orange-100 text-orange-700'
                      }`}
                    >
                      {booking.title}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
