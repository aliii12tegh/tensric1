"use client";

import { useState, useEffect } from "react";
import { Sparkles, Image as ImageIcon, Settings as SettingsIcon, CreditCard, ChevronLeft, Shield, Users, Database, Activity } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

function SidebarLink({ href, icon: Icon, label, active, isCollapsed }: { href: string; icon: React.ElementType; label: string; active?: boolean; isCollapsed: boolean }) {
  return (
    <Link href={href} className={`${active ? 'bg-slate-800 text-blue-500' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'} rounded-xl py-3 flex items-center transition-all duration-200 font-medium ${isCollapsed ? 'justify-center px-0' : 'px-4 gap-3'}`}>
      <Icon className="w-5 h-5 shrink-0" />
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="whitespace-nowrap overflow-hidden">{label}</motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

const mockUsers = [
  { id: "usr_1", name: "Alex Lancer", email: "alex@tensric.io", credits: 12, plan: "Free", joined: "Jun 10, 2026" },
  { id: "usr_2", name: "Sarah Connor", email: "sarah@skynet.com", credits: 250, plan: "Pro Unlimited", joined: "Jun 12, 2026" },
  { id: "usr_3", name: "Bruce Wayne", email: "bruce@waynecorp.com", credits: 500, plan: "Pro Unlimited", joined: "Jun 14, 2026" },
  { id: "usr_4", name: "John Doe", email: "john@doe.com", credits: 2, plan: "Free", joined: "Jun 16, 2026" },
];

export default function AdminPage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
        }
      } catch (err) {
        console.error("Error loading admin session:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  return (
    <div className="h-screen flex text-white font-sans overflow-hidden">
      {/* Floating Pill Sidebar */}
      <motion.aside initial={false} animate={{ width: isCollapsed ? 80 : 256 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="relative bg-slate-900/60 backdrop-blur-xl flex flex-col py-8 border border-slate-800 rounded-[2rem] z-30 shrink-0 ml-4 my-auto h-fit">
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="absolute -right-[14px] top-16 z-50 w-7 h-7 rounded-full bg-blue-600 border-[3px] border-slate-950 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
          <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}><ChevronLeft className="w-3 h-3" strokeWidth={3} /></motion.div>
        </button>
        <div className={`px-6 mb-8 flex flex-col ${isCollapsed ? 'items-center' : 'items-start'}`}>
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo1.png" alt="Tensric Logo" className="w-8 h-8 object-contain shrink-0" />
            <AnimatePresence>{!isCollapsed && (<motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="font-display font-bold text-xl tracking-tight text-white whitespace-nowrap overflow-hidden">Tensric</motion.span>)}</AnimatePresence>
          </Link>
        </div>
        <nav className="flex flex-col gap-2 px-3 mt-4">
          <SidebarLink href="/editor" icon={ImageIcon} label="Upscaler" isCollapsed={isCollapsed} />
          <SidebarLink href="/settings" icon={SettingsIcon} label="Settings" isCollapsed={isCollapsed} />
          <SidebarLink href="/billing" icon={CreditCard} label="Billing" isCollapsed={isCollapsed} />
          <SidebarLink href="/admin" icon={Shield} label="Admin" active isCollapsed={isCollapsed} />
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8 lg:p-12">
          
          {/* Page Header */}
          <div className="mb-10 flex justify-between items-center">
            <div>
              <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">Admin Dashboard</h1>
              <p className="text-slate-400 text-sm font-medium">Manage server load, check API statuses, and oversee users.</p>
            </div>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400 uppercase tracking-wider">
              <Shield className="w-4 h-4" /> Secure Admin Access
            </span>
          </div>

          {/* Overview Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
            {/* Total Users */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl font-extrabold text-white mb-1">142</p>
              <p className="text-[10px] text-emerald-400 font-semibold">+18% growth this week</p>
            </div>

            {/* AI Load */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Upscale Load</p>
                <Activity className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl font-extrabold text-white mb-1">12%</p>
              <p className="text-[10px] text-slate-500 font-semibold">Average wait: 4.8s</p>
            </div>

            {/* Replicate Quota */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Replicate Quota</p>
                <Database className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl font-extrabold text-white mb-1">98%</p>
              <p className="text-[10px] text-emerald-400 font-semibold">API Key is Healthy</p>
            </div>

            {/* Total MRR */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active MRR</p>
                <CreditCard className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl font-extrabold text-white mb-1">$1,420</p>
              <p className="text-[10px] text-slate-500 font-semibold">Stripe billing active</p>
            </div>
          </div>

          {/* System Services Health */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-white mb-4">System Integration Health</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-300">Supabase Connection</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online
                </span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-300">Replicate AI Nodes</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online
                </span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-300">Stripe Webhooks</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online
                </span>
              </div>
            </div>
          </section>

          {/* User Management List */}
          <section className="mb-12">
            <h2 className="text-lg font-bold text-white mb-4">Registered Users</h2>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">User</th>
                    <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Email</th>
                    <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Credits Remaining</th>
                    <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Plan</th>
                    <th className="text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((usr) => (
                    <tr key={usr.id} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 text-sm text-white font-medium">{usr.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{usr.email}</td>
                      <td className="px-6 py-4 text-sm text-white font-bold">{usr.credits} credits</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${usr.plan === 'Free' ? 'text-slate-400 bg-slate-800' : 'text-blue-400 bg-blue-500/10'}`}>
                          {usr.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400 text-right">{usr.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
