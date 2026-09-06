"use client";

import { motion } from "framer-motion";
import { Users, Calendar, IndianRupee, TrendingUp, Clock, CheckCircle } from "lucide-react";

const stats = [
  { name: "Total Enquiries", value: "142", icon: Users, trend: "+12%" },
  { name: "Upcoming Bookings", value: "8", icon: Calendar, trend: "Next 30 days" },
  { name: "Monthly Revenue", value: "₹45,000", icon: IndianRupee, trend: "+5%" },
  { name: "Conversion Rate", value: "24%", icon: TrendingUp, trend: "+2%" },
];

const recentEnquiries = [
  { id: "ENQ-104", name: "Sarah Ahmed", event: "Bridal Mehendi", date: "Oct 15, 2026", status: "New" },
  { id: "ENQ-103", name: "Neha Sharma", event: "Engagement", date: "Sep 28, 2026", status: "Quoted" },
  { id: "ENQ-102", name: "Fatima Khan", event: "Party Mehendi", date: "Sep 20, 2026", status: "Confirmed" },
  { id: "ENQ-101", name: "Priya Patel", event: "Bridal Mehendi", date: "Nov 05, 2026", status: "New" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/5 rounded-md text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.name}</p>
                <h3 className="text-2xl font-serif text-gray-900">{stat.value}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-lg border border-gray-100 shadow-sm"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Recent Enquiries</h2>
            <button className="text-sm text-highlight hover:text-primary transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">ID</th>
                  <th className="p-4 font-medium">Client Name</th>
                  <th className="p-4 font-medium">Event</th>
                  <th className="p-4 font-medium">Event Date</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 text-sm text-gray-500">{enq.id}</td>
                    <td className="p-4 text-sm font-medium text-gray-900">{enq.name}</td>
                    <td className="p-4 text-sm text-gray-600">{enq.event}</td>
                    <td className="p-4 text-sm text-gray-600">{enq.date}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        enq.status === 'New' ? 'bg-blue-50 text-blue-700' :
                        enq.status === 'Quoted' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-green-50 text-green-700'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions / Upcoming */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg border border-gray-100 shadow-sm flex flex-col"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900">Upcoming This Week</h2>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-4">
            <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="w-10 h-10 bg-white rounded shadow-sm border border-gray-100 flex flex-col items-center justify-center shrink-0">
                <span className="text-xs text-gray-500 uppercase">Sep</span>
                <span className="text-sm font-bold text-primary">12</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Bridal Mehendi - Zara</h4>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 10:00 AM</span>
                  <span>Mangaluru Club</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="w-10 h-10 bg-white rounded shadow-sm border border-gray-100 flex flex-col items-center justify-center shrink-0">
                <span className="text-xs text-gray-500 uppercase">Sep</span>
                <span className="text-sm font-bold text-primary">15</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Engagement - Ayesha</h4>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 2:00 PM</span>
                  <span>Taj Gateway</span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4">
              <button className="w-full py-2 border border-primary/20 text-primary rounded text-sm hover:bg-primary/5 transition-colors">
                View Calendar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
