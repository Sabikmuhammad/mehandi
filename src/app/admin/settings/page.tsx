"use client";

import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-serif text-forest mb-1">Business Settings</h1>
        <p className="text-sm text-forest/60">Manage your business information and application preferences.</p>
      </div>

      <div className="bg-white border border-forest/10 rounded-sm shadow-sm overflow-hidden">
        <div className="border-b border-forest/10 bg-ivory/30 flex p-0">
          <button className="px-6 py-4 text-sm font-medium text-gold border-b-2 border-gold">General</button>
          <button className="px-6 py-4 text-sm font-medium text-forest/60 hover:text-forest hover:bg-ivory/50 transition-colors">Notifications</button>
          <button className="px-6 py-4 text-sm font-medium text-forest/60 hover:text-forest hover:bg-ivory/50 transition-colors">Payment Integrations</button>
          <button className="px-6 py-4 text-sm font-medium text-forest/60 hover:text-forest hover:bg-ivory/50 transition-colors">Security</button>
        </div>
        
        <div className="p-8 space-y-8">
          
          <section className="space-y-4">
            <h3 className="text-sm font-serif text-forest border-b border-forest/5 pb-2">Business Profile</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-forest">Business Name</label>
                <input 
                  type="text" 
                  defaultValue="Raihana Mehendi Artistry"
                  className="w-full border border-forest/20 px-4 py-2.5 text-forest focus:outline-none focus:border-gold transition-colors text-sm rounded-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-forest">Phone Number</label>
                <input 
                  type="text" 
                  defaultValue="+91 90000 00000"
                  className="w-full border border-forest/20 px-4 py-2.5 text-forest focus:outline-none focus:border-gold transition-colors text-sm rounded-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-forest">Public Email</label>
                <input 
                  type="email" 
                  defaultValue="hello@raihanamehendi.com"
                  className="w-full border border-forest/20 px-4 py-2.5 text-forest focus:outline-none focus:border-gold transition-colors text-sm rounded-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-forest">Location Base</label>
                <input 
                  type="text" 
                  defaultValue="Mangaluru, Karnataka"
                  className="w-full border border-forest/20 px-4 py-2.5 text-forest focus:outline-none focus:border-gold transition-colors text-sm rounded-sm"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-serif text-forest border-b border-forest/5 pb-2">Social Links</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-forest">Instagram URL</label>
                <input 
                  type="text" 
                  defaultValue="https://instagram.com/raihana_mehendi"
                  className="w-full border border-forest/20 px-4 py-2.5 text-forest focus:outline-none focus:border-gold transition-colors text-sm rounded-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-forest">Facebook URL</label>
                <input 
                  type="text" 
                  className="w-full border border-forest/20 px-4 py-2.5 text-forest focus:outline-none focus:border-gold transition-colors text-sm rounded-sm"
                />
              </div>
            </div>
          </section>

          <div className="pt-4 border-t border-forest/10 flex justify-end">
            <button className="px-6 py-3 bg-forest text-ivory text-xs font-medium uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-colors rounded-sm shadow-sm flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
