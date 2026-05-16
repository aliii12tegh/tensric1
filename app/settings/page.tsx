"use client";

import { useState } from "react";
import { Sparkles, Image as ImageIcon, Settings as SettingsIcon, CreditCard, ChevronLeft, User, Shield, Bell, AlertTriangle, Download, Trash2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <div onClick={onToggle} className={`w-11 h-6 rounded-full p-1 transition-colors flex items-center cursor-pointer ${enabled ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'}`}>
      <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
    </div>
  );
}

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

export default function SettingsPage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [defaultQuality, setDefaultQuality] = useState("4x");

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
          <SidebarLink href="/settings" icon={SettingsIcon} label="Settings" active isCollapsed={isCollapsed} />
          <SidebarLink href="/billing" icon={CreditCard} label="Billing" isCollapsed={isCollapsed} />
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8 lg:p-12">
          <div className="mb-10">
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">Account Settings</h1>
            <p className="text-slate-400 text-sm font-medium">Manage your profile, security, and preferences.</p>
          </div>

          {/* Profile */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4"><User className="w-5 h-5 text-blue-500" /><h2 className="text-lg font-bold text-white">Profile</h2></div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-blue-600/20">AL</div>
                  <button className="text-xs font-semibold text-blue-500 hover:text-blue-400 transition-colors">Change Avatar</button>
                </div>
                <div className="flex-1 space-y-5 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                      <input type="text" defaultValue="Alex Lancer" className="w-full bg-slate-950/50 border border-slate-800 px-4 py-3 rounded-xl text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                      <input type="email" defaultValue="alex@tensric.io" disabled className="w-full bg-slate-950/50 border border-slate-800 px-4 py-3 rounded-xl text-slate-500 cursor-not-allowed" />
                    </div>
                  </div>
                  <button className="px-6 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">Save Changes</button>
                </div>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4"><Shield className="w-5 h-5 text-blue-500" /><h2 className="text-lg font-bold text-white">Security</h2></div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current Password</label>
                <input type="password" placeholder="••••••••••" className="w-full max-w-md bg-slate-950/50 border border-slate-800 px-4 py-3 rounded-xl text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">New Password</label>
                  <input type="password" placeholder="••••••••••" className="w-full bg-slate-950/50 border border-slate-800 px-4 py-3 rounded-xl text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Confirm Password</label>
                  <input type="password" placeholder="••••••••••" className="w-full bg-slate-950/50 border border-slate-800 px-4 py-3 rounded-xl text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600" />
                </div>
              </div>
              <div className="border-t border-slate-800 pt-6 flex items-center justify-between">
                <div><p className="text-sm font-bold text-white">Two-Factor Authentication</p><p className="text-xs text-slate-500 mt-0.5">Add an extra layer of security.</p></div>
                <Toggle enabled={twoFactor} onToggle={() => setTwoFactor(!twoFactor)} />
              </div>
              <div className="border-t border-slate-800 pt-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Active Sessions</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3">
                    <div><p className="text-sm font-semibold text-white">MacBook Pro — Chrome</p><p className="text-xs text-slate-500">192.168.1.120 · Active now</p></div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">Current</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3">
                    <div><p className="text-sm font-semibold text-white">iPhone 15 — Safari</p><p className="text-xs text-slate-500">10.0.0.42 · 2 hours ago</p></div>
                    <button className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors">Revoke</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4"><Bell className="w-5 h-5 text-blue-500" /><h2 className="text-lg font-bold text-white">Preferences</h2></div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-bold text-white">Email Notifications</p><p className="text-xs text-slate-500 mt-0.5">Receive updates about your processing jobs.</p></div>
                <Toggle enabled={emailNotifications} onToggle={() => setEmailNotifications(!emailNotifications)} />
              </div>
              <div className="border-t border-slate-800 pt-6 flex items-center justify-between">
                <div><p className="text-sm font-bold text-white">Marketing Communications</p><p className="text-xs text-slate-500 mt-0.5">Stay updated on new AI models and features.</p></div>
                <Toggle enabled={marketing} onToggle={() => setMarketing(!marketing)} />
              </div>
              <div className="border-t border-slate-800 pt-6">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Default Upscale Quality</label>
                <select value={defaultQuality} onChange={(e) => setDefaultQuality(e.target.value)} className="w-full max-w-xs bg-slate-950/50 border border-slate-800 px-4 py-3 rounded-xl text-white focus:border-blue-500 outline-none transition-all cursor-pointer">
                  <option value="2x">2x — Fast (720p → 1440p)</option>
                  <option value="4x">4x — Balanced (720p → 4K)</option>
                  <option value="8x">8x — Maximum (720p → 8K)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4"><AlertTriangle className="w-5 h-5 text-red-500" /><h2 className="text-lg font-bold text-white">Danger Zone</h2></div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-bold text-white">Export Your Data</p><p className="text-xs text-slate-500 mt-0.5">Download a copy of all your images and account data.</p></div>
                <button className="px-5 py-2.5 rounded-xl font-bold text-sm border border-slate-800 text-white hover:bg-slate-800 transition-colors flex items-center gap-2"><Download className="w-4 h-4" />Export</button>
              </div>
              <div className="border-t border-red-500/10 pt-6 flex items-center justify-between">
                <div><p className="text-sm font-bold text-red-400">Delete Account</p><p className="text-xs text-slate-500 mt-0.5">Permanently delete your account and all data.</p></div>
                <button className="px-5 py-2.5 rounded-xl font-bold text-sm border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"><Trash2 className="w-4 h-4" />Delete</button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
