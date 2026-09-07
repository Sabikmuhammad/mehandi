"use client";

import { useState } from "react";
import { format, addMonths, startOfMonth, eachDayOfInterval, endOfMonth, isSameMonth, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, Lock, Unlock, AlertCircle } from "lucide-react";

const mockAvailability = [
  { date: new Date(2026, 8, 12), status: "Unavailable", note: "Fully booked" },
  { date: new Date(2026, 8, 13), status: "Unavailable", note: "Personal day" },
  { date: new Date(2026, 8, 18), status: "Limited", note: "Only morning available" },
];

export default function AvailabilityPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  
  const days = eachDayOfInterval({
    start: monthStart,
    end: monthEnd
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-forest mb-1">Availability</h1>
        <p className="text-sm text-forest/60">Block dates to prevent new enquiries for specific days.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Availability Calendar */}
        <div className="lg:col-span-2 bg-white border border-forest/10 rounded-sm shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-serif text-forest">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentDate(addMonths(currentDate, -1))}
                className="p-2 border border-forest/10 rounded hover:bg-forest/5 text-forest transition-colors bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="p-2 border border-forest/10 rounded hover:bg-forest/5 text-forest transition-colors bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div key={day} className="text-center text-[10px] uppercase tracking-widest text-forest/50 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {/* Empty slots for starting day offset */}
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="h-16 rounded border border-transparent"></div>
            ))}
            
            {days.map(day => {
              const avail = mockAvailability.find(a => isSameDay(a.date, day));
              const isSelected = selectedDate && isSameDay(selectedDate, day);
              
              let bgClass = "bg-white hover:border-gold/50";
              let textClass = "text-forest";
              
              if (avail?.status === "Unavailable") {
                bgClass = "bg-red-50 hover:bg-red-100";
                textClass = "text-red-700";
              } else if (avail?.status === "Limited") {
                bgClass = "bg-orange-50 hover:bg-orange-100";
                textClass = "text-orange-700";
              }

              if (isSelected) {
                bgClass = "ring-2 ring-gold ring-offset-2";
              }

              return (
                <button
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={`h-16 md:h-20 rounded border border-forest/10 transition-all flex flex-col items-center justify-center relative ${bgClass}`}
                >
                  <span className={`text-sm font-medium ${textClass}`}>
                    {format(day, "d")}
                  </span>
                  {avail?.status === "Unavailable" && (
                    <Lock className="w-3 h-3 text-red-500 mt-1 absolute bottom-2" />
                  )}
                  {avail?.status === "Limited" && (
                    <AlertCircle className="w-3 h-3 text-orange-500 mt-1 absolute bottom-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-white border border-forest/10 rounded-sm shadow-sm overflow-hidden h-fit">
          <div className="p-4 border-b border-forest/10 bg-ivory/30">
            <h2 className="text-xs uppercase tracking-widest text-forest font-medium">Manage Date</h2>
          </div>
          
          <div className="p-6">
            {!selectedDate ? (
              <div className="text-center py-8 text-forest/50 text-sm">
                Select a date from the calendar to manage availability.
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif text-forest mb-1">
                    {format(selectedDate, "MMMM d, yyyy")}
                  </h3>
                  <p className="text-sm text-forest/60">
                    {mockAvailability.find(a => isSameDay(a.date, selectedDate))?.status || "Available"}
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs uppercase tracking-widest text-forest">Status</label>
                  <select className="w-full border border-forest/20 px-4 py-3 text-forest focus:outline-none focus:border-gold transition-colors bg-white rounded-sm">
                    <option>Available</option>
                    <option>Limited (Morning only)</option>
                    <option>Limited (Evening only)</option>
                    <option>Unavailable (Fully booked)</option>
                    <option>Unavailable (Personal/Leave)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs uppercase tracking-widest text-forest">Internal Note (Optional)</label>
                  <textarea 
                    rows={3}
                    className="w-full border border-forest/20 px-4 py-3 text-forest focus:outline-none focus:border-gold transition-colors bg-white rounded-sm resize-none"
                    placeholder="e.g. Traveling to Bangalore"
                  />
                </div>

                <button className="w-full py-3 bg-forest text-ivory text-xs font-medium uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-colors rounded-sm shadow-sm mt-4">
                  Save Availability
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
