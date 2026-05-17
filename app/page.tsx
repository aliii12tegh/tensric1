/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield, Layers, Cpu, CheckCircle } from "lucide-react";
import Link from "next/link";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

/* ─── 3D TILT IMAGE COMPARISON SLIDER (PRESERVED EXACTLY) ─── */
function ImageComparisonSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 60, damping: 15, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 60, damping: 15, mass: 0.5 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["25deg", "-25deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "25deg"]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pointerX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((pointerX / rect.width) * 100);
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handlePointerLeave = () => { setSliderPosition(50); x.set(0); y.set(0); };

  return (
    <motion.div style={{ rotateX, rotateY, perspective: 1200 }} className="w-full max-w-6xl mx-auto aspect-video shadow-2xl shadow-purple-900/30 rounded-3xl">
      <div ref={containerRef} className="relative w-full h-full rounded-3xl overflow-hidden cursor-crosshair select-none border border-white/5" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} style={{ transformStyle: "preserve-3d" }}>
        <img src="/oussamine-high.jpg" alt="High Resolution" className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0" />
        <img src="/oussamine-low.jpg" alt="Low Resolution" className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10" style={{ clipPath: `inset(0 calc(100% - ${sliderPosition}%) 0 0)` }} />
        <div className="absolute inset-y-0 w-[2px] bg-white/60 backdrop-blur shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none z-20 transition-all duration-75 ease-out" style={{ left: `${sliderPosition}%` }} />
        <div className="absolute bottom-6 left-6 glass px-4 py-2 rounded-xl flex items-center gap-2 pointer-events-none z-30 border border-white/10 shadow-xl" style={{ transform: "translateZ(30px)" }}>
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
          <span className="text-xs font-bold tracking-wider text-white">REAL-ESRGAN V3</span>
        </div>
        <div className="absolute bottom-6 right-6 glass px-4 py-2 rounded-xl pointer-events-none z-30 border border-white/10 shadow-xl bg-purple-900/20" style={{ transform: "translateZ(30px)" }}>
          <span className="text-xs font-bold text-white tracking-wider">4X UPSCALED</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── LOGO TICKER ─── */
const brands = ["LUMINA", "PIXELCORE", "SYNTHWAVE", "NEURALBIT", "VOXELAI", "DEEPFRAME"];
function LogoTicker() {
  return (
    <div className="py-16 border-y border-white/5 overflow-hidden">
      <div className="flex animate-[scroll_20s_linear_infinite] gap-16 w-max">
        {[...brands, ...brands].map((b, i) => (
          <span key={i} className="text-xl font-display font-bold text-slate-600 tracking-widest whitespace-nowrap">{b}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function LandingPage() {
  return (
    <div className="min-h-screen text-slate-50 font-sans selection:bg-purple-600/30 overflow-x-hidden relative">
      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-900/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-violet-800/10 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-purple-700/5 blur-[200px]" />
      </div>

      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
            <span className="font-display font-bold text-xl tracking-tight">Tensric</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#stack" className="hover:text-white transition-colors">Stack</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium hover:text-purple-400 transition-colors">Sign In</Link>
            <Link href="/editor" className="text-sm font-bold bg-gradient-to-r from-purple-700 to-violet-500 text-white px-5 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all hover:scale-105 active:scale-95">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32">

        {/* ─── HERO ─── */}
        <section className="px-6 pb-24 pt-10 flex flex-col items-center text-center">
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center max-w-5xl mx-auto mb-16">
            <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 glass text-purple-400 text-xs font-bold rounded-full mb-8 tracking-wider border border-purple-500/20">V3.0 — NEURAL SYNTHESIS ENGINE</motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 leading-[0.9]">
              Transform Pixels<br />Into <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Perfection.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
              Professional AI image upscaling powered by state-of-the-art neural networks. Restore details, remove noise, and breathe new life into your visuals.
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-4">
              <Link href="/editor" className="group flex items-center gap-3 bg-gradient-to-r from-purple-700 to-violet-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:scale-105">
                Launch Studio <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#stack" className="flex items-center gap-2 border border-white/10 text-slate-300 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-all">View Models</Link>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full px-4 lg:px-0">
            <ImageComparisonSlider />
          </motion.div>
        </section>

        {/* ─── LOGO TICKER ─── */}
        <LogoTicker />

        {/* ─── BENTO FEATURES ─── */}
        <section id="features" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <span className="text-purple-500 font-bold tracking-widest text-sm uppercase mb-3 block">Features</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Everything You Need to Create</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Large Feature Card */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-10 hover:border-purple-600/40 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/15 transition-colors" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6"><Cpu className="w-7 h-7 text-purple-500" /></div>
                  <h3 className="font-display text-2xl font-bold mb-3">Precision Pro v3</h3>
                  <p className="text-slate-400 leading-relaxed max-w-lg">Our flagship neural network engine. Trained on over 2 billion image pairs to deliver unmatched clarity, texture preservation, and artifact-free upscaling at up to 8x magnification.</p>
                </div>
              </motion.div>
              {[
                { icon: Zap, title: "Lightning Fast", desc: "Process 4K images in seconds with optimized cloud GPUs." },
                { icon: Shield, title: "Secure Storage", desc: "End-to-end encrypted assets with zero-knowledge architecture." },
                { icon: Layers, title: "Batch Processing", desc: "Upscale hundreds of images at once with the bulk engine." },
                { icon: Sparkles, title: "API Access", desc: "Integrate our upscaling engine directly into your workflow." },
              ].map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-purple-600/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6"><f.icon className="w-6 h-6 text-purple-500" /></div>
                  <h3 className="font-display text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SHOWCASE ─── */}
        <section className="py-32 px-6 bg-slate-900/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Professional Control. <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Redefined.</span></h2>
              <p className="text-slate-400 max-w-xl mx-auto">Fine-tune every parameter with studio-grade precision tools.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl shadow-purple-900/10 max-w-5xl mx-auto">
              <img src="/neural-showcase.png" alt="Neural Showcase" className="w-full h-auto" />
            </motion.div>
          </div>
        </section>

        {/* ─── NEURAL STACK ─── */}
        <section id="stack" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-purple-500 font-bold tracking-widest text-sm uppercase mb-3 block">The Neural Stack</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Powered by Three Engines</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { img: "/substrate-engine.png", title: "Substrate Engine", desc: "Crystal-clear texture reconstruction from any source quality." },
                { img: "/neural-flux.png", title: "Neural Flux", desc: "Adaptive detail synthesis for organic textures and faces." },
                { img: "/quantum-mesh.png", title: "Quantum Mesh", desc: "Edge-aware processing for architectural and product imagery." },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden hover:border-purple-600/30 transition-colors group">
                  <div className="aspect-square overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section id="pricing" className="py-32 px-6 bg-slate-900/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Built for Scale</h2>
              <p className="text-slate-400">Start for free, upgrade when you need more power.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
              {/* Starter */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col">
                <h3 className="font-display text-xl font-bold mb-2">Starter</h3>
                <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                <p className="text-slate-400 mb-8 text-sm">Perfect for occasional use.</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {["10 upscales/month", "Standard speed", "Up to 2x magnification"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" /><span>{item}</span></li>
                  ))}
                </ul>
                <Link href="/login" className="block w-full py-3 px-6 rounded-xl font-bold bg-slate-800 text-center hover:bg-slate-700 transition-colors">Get Started</Link>
              </motion.div>
              {/* Pro */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-10 rounded-3xl bg-slate-900/60 border-2 border-purple-600 flex flex-col relative shadow-[0_0_40px_rgba(147,51,234,0.15)] md:-translate-y-4">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 bg-purple-600/20 text-purple-400 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">Most Popular</div>
                  <h3 className="font-display text-2xl font-bold mb-2">Pro</h3>
                  <div className="text-5xl font-bold mb-6">$19<span className="text-lg text-slate-400 font-normal">/mo</span></div>
                  <p className="text-slate-400 mb-8 text-sm">For creators and professionals.</p>
                  <ul className="space-y-4 mb-10 flex-1">
                    {["Unlimited upscales", "Priority processing", "Up to 8x magnification", "API Access"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-200 text-sm"><CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" /><span>{item}</span></li>
                    ))}
                  </ul>
                  <Link href="/login" className="block w-full py-3 px-6 rounded-xl font-bold bg-gradient-to-r from-purple-700 to-violet-500 text-white text-center hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all">Upgrade to Pro</Link>
                </div>
              </motion.div>
              {/* Premium */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col">
                <h3 className="font-display text-xl font-bold mb-2">Premium</h3>
                <div className="text-4xl font-bold mb-6">$99<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                <p className="text-slate-400 mb-8 text-sm">For high-volume teams.</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {["Unlimited everything", "Dedicated GPU cluster", "Custom integrations", "24/7 Phone support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" /><span>{item}</span></li>
                  ))}
                </ul>
                <Link href="/login" className="block w-full py-3 px-6 rounded-xl font-bold bg-slate-800 text-center hover:bg-slate-700 transition-colors">Upgrade to Premium</Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="py-32 px-6 text-center relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-[50vw] h-[50vw] rounded-full bg-purple-600/5 blur-[150px]" /></div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 max-w-4xl mx-auto">
            <h2 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-tight">Bring Every Pixel<br />Back To <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Life.</span></h2>
            <Link href="/editor" className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-700 to-violet-500 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] hover:scale-105 transition-all">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 text-center border-t border-white/5 relative z-10 bg-slate-950">
        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Tensric. All rights reserved.</p>
      </footer>
    </div>
  );
}
