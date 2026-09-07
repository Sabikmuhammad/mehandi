"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { login } from "./actions";
import { Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 md:p-10 shadow-sm border border-forest/10 rounded-sm"
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-forest mb-2">
            RAIHANA MEHENDI ARTISTRY
          </h1>
          <p className="text-forest/60 text-sm">Welcome back</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm border border-red-100 rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-forest mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-forest/20 px-4 py-3 text-forest focus:outline-none focus:border-gold transition-colors"
              placeholder="admin@raihanamehendi.com"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs uppercase tracking-widest text-forest">Password</label>
              <a href="#" className="text-xs text-gold hover:text-forest transition-colors">Forgot password?</a>
            </div>
            <input
              type="password"
              name="password"
              required
              className="w-full border border-forest/20 px-4 py-3 text-forest focus:outline-none focus:border-gold transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-forest text-ivory py-4 text-sm uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-colors font-medium mt-4 flex justify-center items-center gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
