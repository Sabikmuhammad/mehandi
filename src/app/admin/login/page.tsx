"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 md:p-10 shadow-sm border border-primary/10 rounded-sm"
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-primary mb-2">Admin Portal</h1>
          <p className="text-primary/60 text-sm">Sign in to manage your studio.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-primary mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-primary/20 px-4 py-3 text-primary focus:outline-none focus:border-primary transition-colors"
              placeholder="admin@raihanamehendi.com"
            />
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-primary mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-primary/20 px-4 py-3 text-primary focus:outline-none focus:border-primary transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-secondary py-4 text-sm uppercase tracking-widest hover:bg-highlight hover:text-primary transition-colors font-medium mt-4"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}
