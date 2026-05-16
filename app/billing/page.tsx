"use client";

import { useState } from "react";
import { Sparkles, Image as ImageIcon, Settings as SettingsIcon, CreditCard, ChevronLeft, Zap, FileText } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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

const billingHistory = [
  { date: "May 1, 2026", description: "Free Plan — Monthly", amount: "$0.00", status: "Paid", invoice: "#INV-2605" },
  { date: "Apr 1, 2026", description: "Free Plan — Monthly", amount: "$0.00", status: "Paid", invoice: "#INV-2604" },
  { date: "Mar 1, 2026", description: "Free Plan — Monthly", amount: "$0.00", status: "Paid", invoice: "#INV-2603" },
  { date: "Feb 1, 2026", description: "Credit Top-Up (50 credits)", amount: "$4.99", status: "Paid", invoice: "#INV-2602" },
];

export default function BillingPage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const creditsUsed = 38;
  const creditsTotal = 50;
  const creditsRemaining = creditsTotal - creditsUsed;

  return (
    <div className="h-screen flex text-white font-sans overflow-hidden">
      {/* Floating Pill Sidebar */}
      <motion.aside initial={false} animate={{ width: isCollapsed ? 80 : 256 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="relative bg-slate-900/60 backdrop-blur-xl flex flex-col py-8 border border-slate-800 rounded-[2rem] z-30 shrink-0 ml-4 my-auto h-fit">
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="absolute -right-[14px] top-16 z-50 w-7 h-7 rounded-full bg-blue-600 border-[3px] border-slate-950 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
          <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}><ChevronLeft className="w-3 h-3" strokeWidth={3} /></motion.div>
        </button>
        <div className={`px-6 mb-8 flex flex-col ${isCollapsed ? 'items-center' : 'items-start'}`}>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0"><Sparkles className="w-4 h-4 text-white" /></div>
            <AnimatePresence>{!isCollapsed && (<motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="font-display font-bold text-xl tracking-tight text-white whitespace-nowrap overflow-hidden">Tensric</motion.span>)}</AnimatePresence>
          </Link>
        </div>
        <nav className="flex flex-col gap-2 px-3 mt-4">
          <SidebarLink href="/editor" icon={ImageIcon} label="Upscaler" isCollapsed={isCollapsed} />
          <SidebarLink href="/settings" icon={SettingsIcon} label="Settings" isCollapsed={isCollapsed} />
          <SidebarLink href="/billing" icon={CreditCard} label="Billing" active isCollapsed={isCollapsed} />
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8 lg:p-12">

          {/* Page Header */}
          <div className="mb-10">
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">Billing</h1>
            <p className="text-slate-400 text-sm font-medium">Manage your subscription, credits, and payment methods.</p>
          </div>

          {/* Plan Banner */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">Current Plan</span>
                <h2 className="text-2xl font-bold text-white mt-3">Free Plan</h2>
                <p className="text-sm text-slate-400 mt-1">50 credits / month · Renews June 1, 2026</p>
              </div>
              <button className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg shadow-blue-600/20 hover:brightness-110 transition-all flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Upgrade Plan
              </button>
            </div>
          </div>

          {/* 3 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {/* Credits Used */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Credits Used</p>
              <p className="text-3xl font-extrabold text-white mb-3">{creditsUsed}<span className="text-base font-medium text-slate-500 ml-1">/ {creditsTotal}</span></p>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-2 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" style={{ width: `${(creditsUsed / creditsTotal) * 100}%` }} />
              </div>
              <p className="text-[10px] text-slate-500 mt-2">{Math.round((creditsUsed / creditsTotal) * 100)}% of monthly quota used</p>
            </div>

            {/* Credits Remaining */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Credits Remaining</p>
              <p className="text-3xl font-extrabold text-white mb-1">{creditsRemaining}</p>
              <p className="text-xs text-slate-500">Resets on June 1, 2026</p>
            </div>

            {/* Next Bill */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Next Bill</p>
              <p className="text-3xl font-extrabold text-white mb-1">$0.00</p>
              <p className="text-xs text-slate-500">Free plan — no charge</p>
            </div>
          </div>

          {/* Payment Method */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-bold text-white">Payment Method</h2>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">VISA</div>
                  <div>
                    <p className="text-sm font-bold text-white">Visa ending in 4242</p>
                    <p className="text-xs text-slate-500">Expires 12/2028</p>
                  </div>
                </div>
                <button className="px-5 py-2.5 rounded-xl font-bold text-sm border border-slate-800 text-white hover:bg-slate-800 transition-colors">Update</button>
              </div>
            </div>
          </section>

          {/* Billing History */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-bold text-white">Billing History</h2>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Date</th>
                    <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Description</th>
                    <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Amount</th>
                    <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((item, i) => (
                    <tr key={i} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-300">{item.date}</td>
                      <td className="px-6 py-4 text-sm text-white font-medium">{item.description}</td>
                      <td className="px-6 py-4 text-sm text-white font-bold">{item.amount}</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">{item.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors">{item.invoice}</button>
                      </td>
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
