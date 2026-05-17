/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield, Layers, Cpu, CheckCircle } from "lucide-react";
import Link from "next/link";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

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
    <motion.div style={{ rotateX, rotateY, perspective: 1200 }} className="w-full max-w-6xl mx-auto aspect-video rounded-xl shadow-[0_0_80px_rgba(160,120,255,0.12)]">
      <div ref={containerRef} className="relative w-full h-full rounded-xl overflow-hidden cursor-crosshair select-none" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} style={{ transformStyle: "preserve-3d", border: "1px solid rgba(255,255,255,0.06)" }}>
        <img src="/oussamine-high.jpg" alt="High Resolution" className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0" />
        <img src="/oussamine-low.jpg" alt="Low Resolution" className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10" style={{ clipPath: `inset(0 calc(100% - ${sliderPosition}%) 0 0)` }} />
        <div className="absolute inset-y-0 w-[2px] bg-white/70 shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none z-20 transition-all duration-75 ease-out" style={{ left: `${sliderPosition}%` }} />
        <div className="absolute bottom-5 left-5 bg-[#1a1a1a99] backdrop-blur-xl px-4 py-2 rounded-lg flex items-center gap-2 pointer-events-none z-30" style={{ transform: "translateZ(30px)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="w-2 h-2 rounded-full bg-[#5de6ff] shadow-[0_0_10px_#5de6ff]" />
          <span className="text-[11px] font-mono font-medium tracking-wider text-[#cbc3d7] uppercase">Real-ESRGAN v3</span>
        </div>
        <div className="absolute bottom-5 right-5 bg-[#1a1a1a99] backdrop-blur-xl px-4 py-2 rounded-lg pointer-events-none z-30" style={{ transform: "translateZ(30px)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-[11px] font-mono font-medium tracking-wider text-[#d0bcff] uppercase">4x Upscaled</span>
        </div>
      </div>
    </motion.div>
  );
}

const brands = ["LUMINA", "PIXELCORE", "SYNTHWAVE", "NEURALBIT", "VOXELAI", "DEEPFRAME"];

export default function LandingPage() {
  return (
    <div className="min-h-screen text-[#e5e2e1] font-sans selection:bg-[#a078ff]/30 overflow-x-hidden relative" style={{ background: "#050505" }}>
      {/* Ambient Mesh Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#4C1D95]/10 blur-[180px]" />
        <div className="absolute bottom-[-25%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-[#4C1D95]/8 blur-[180px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[30vw] h-[30vw] rounded-full bg-[#a078ff]/5 blur-[200px]" />
      </div>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full z-50" style={{ background: "rgba(5,5,5,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#a078ff] flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
            <span className="font-display font-bold text-xl tracking-tight text-white">Tensric</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#958ea0]">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#stack" className="hover:text-white transition-colors">Stack</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/login" className="text-sm font-medium text-[#958ea0] hover:text-[#d0bcff] transition-colors">Sign In</Link>
            <Link href="/editor" className="text-sm font-bold bg-[#a078ff] text-[#050505] px-5 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(160,120,255,0.5)] transition-all hover:brightness-110" style={{ borderTop: "0.5px solid rgba(255,255,255,0.3)" }}>Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32">
        {/* ── HERO ── */}
        <section className="px-6 pb-20 pt-12 flex flex-col items-center text-center" style={{ paddingBottom: "80px" }}>
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center max-w-5xl mx-auto mb-16">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md mb-10 text-[#5de6ff] font-mono text-[12px] font-medium tracking-[0.1em] uppercase" style={{ background: "rgba(93,230,255,0.08)", border: "1px solid rgba(93,230,255,0.15)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#5de6ff] shadow-[0_0_8px_#5de6ff]" />
              V3.0 — Neural Synthesis Engine
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-[clamp(40px,7vw,80px)] font-extrabold tracking-[-0.04em] leading-[1.1] mb-6 text-white">
              Transform Pixels<br />Into <span className="bg-gradient-to-r from-[#d0bcff] via-[#a078ff] to-[#5de6ff] bg-clip-text text-transparent">Perfection.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-[#958ea0] mb-10 max-w-2xl mx-auto leading-relaxed">
              Professional AI image upscaling powered by state-of-the-art neural networks. Restore details, remove noise, and breathe new life into your visuals.
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-4">
              <Link href="/editor" className="group flex items-center gap-3 bg-[#a078ff] text-[#050505] px-8 py-4 rounded-lg font-bold text-base transition-all hover:shadow-[0_0_30px_rgba(160,120,255,0.5)] hover:brightness-110" style={{ borderTop: "0.5px solid rgba(255,255,255,0.3)" }}>
                Launch Studio <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#stack" className="flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-base text-[#cbc3d7] hover:bg-white/5 transition-all" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>View Models</Link>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full px-4 lg:px-0">
            <ImageComparisonSlider />
          </motion.div>
        </section>

        {/* ── LOGO TICKER ── */}
        <div className="py-14 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="flex animate-[scroll_20s_linear_infinite] gap-16 w-max">
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className="text-xl font-display font-bold text-[#353535] tracking-widest whitespace-nowrap">{b}</span>
            ))}
          </div>
        </div>

        {/* ── BENTO FEATURES ── */}
        <section id="features" className="py-20 px-6" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="max-w-[1440px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <span className="font-mono text-[12px] font-medium tracking-[0.1em] uppercase text-[#5de6ff] mb-3 block">Features</span>
              <h2 className="font-display text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.02em] text-white">Everything You Need to Create</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-2 rounded-xl p-10 relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_40px_rgba(160,120,255,0.08)]" style={{ background: "rgba(26,26,26,0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#4C1D95]/15 rounded-full blur-[64px] group-hover:bg-[#4C1D95]/20 transition-colors animate-[bloom-pulse_4s_ease-in-out_infinite]" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: "#131313", border: "1px solid rgba(255,255,255,0.06)" }}><Cpu className="w-7 h-7 text-[#a078ff]" /></div>
                  <h3 className="font-display text-2xl font-semibold mb-3 text-white">Precision Pro v3</h3>
                  <p className="text-[#958ea0] leading-relaxed max-w-lg">Our flagship neural network engine. Trained on over 2 billion image pairs to deliver unmatched clarity, texture preservation, and artifact-free upscaling at up to 8x magnification.</p>
                </div>
              </motion.div>
              {[
                { icon: Zap, title: "Lightning Fast", desc: "Process 4K images in seconds with optimized cloud GPUs." },
                { icon: Shield, title: "Secure Storage", desc: "End-to-end encrypted assets with zero-knowledge architecture." },
                { icon: Layers, title: "Batch Processing", desc: "Upscale hundreds of images at once with the bulk engine." },
                { icon: Sparkles, title: "API Access", desc: "Integrate our upscaling engine directly into your workflow." },
              ].map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(160,120,255,0.06)]" style={{ background: "rgba(26,26,26,0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: "#131313", border: "1px solid rgba(255,255,255,0.06)" }}><f.icon className="w-6 h-6 text-[#a078ff]" /></div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-white">{f.title}</h3>
                  <p className="text-[#958ea0] leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SHOWCASE ── */}
        <section className="py-20 px-6" style={{ paddingTop: "80px", paddingBottom: "80px", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="max-w-[1440px] mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <h2 className="font-display text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.02em] text-white mb-4">Professional Control. <span className="bg-gradient-to-r from-[#d0bcff] to-[#5de6ff] bg-clip-text text-transparent">Redefined.</span></h2>
              <p className="text-[#958ea0] max-w-xl mx-auto">Fine-tune every parameter with studio-grade precision tools.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-xl overflow-hidden max-w-5xl mx-auto shadow-[0_0_60px_rgba(160,120,255,0.08)]" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <img src="/neural-showcase.png" alt="Neural Showcase" className="w-full h-auto" />
            </motion.div>
          </div>
        </section>

        {/* ── NEURAL STACK ── */}
        <section id="stack" className="py-20 px-6" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="max-w-[1440px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="font-mono text-[12px] font-medium tracking-[0.1em] uppercase text-[#5de6ff] mb-3 block">The Neural Stack</span>
              <h2 className="font-display text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.02em] text-white">Powered by Three Engines</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { img: "/substrate-engine.png", title: "Substrate Engine", desc: "Crystal-clear texture reconstruction from any source quality." },
                { img: "/neural-flux.png", title: "Neural Flux", desc: "Adaptive detail synthesis for organic textures and faces." },
                { img: "/quantum-mesh.png", title: "Quantum Mesh", desc: "Edge-aware processing for architectural and product imagery." },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-[0_0_40px_rgba(160,120,255,0.08)]" style={{ background: "rgba(26,26,26,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="aspect-square overflow-hidden"><img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold mb-2 text-white">{item.title}</h3>
                    <p className="text-[#958ea0] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="py-20 px-6" style={{ paddingTop: "80px", paddingBottom: "80px", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="max-w-[1440px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="font-display text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.02em] text-white mb-4">Built for Scale</h2>
              <p className="text-[#958ea0]">Start for free, upgrade when you need more power.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
              {/* Starter */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-xl flex flex-col" style={{ background: "rgba(26,26,26,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 className="font-display text-xl font-semibold mb-2 text-white">Starter</h3>
                <div className="text-4xl font-bold mb-6 text-white">$0<span className="text-lg text-[#958ea0] font-normal">/mo</span></div>
                <p className="text-[#958ea0] mb-8 text-sm">Perfect for occasional use.</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {["10 upscales/month", "Standard speed", "Up to 2x magnification"].map((item, i) => (<li key={i} className="flex items-center gap-3 text-[#cbc3d7] text-sm"><CheckCircle className="w-5 h-5 text-[#a078ff] flex-shrink-0" /><span>{item}</span></li>))}
                </ul>
                <Link href="/login" className="block w-full py-3 px-6 rounded-lg font-bold text-center text-white transition-colors" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>Get Started</Link>
              </motion.div>
              {/* Pro */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-10 rounded-xl flex flex-col relative md:-translate-y-4 shadow-[0_0_64px_rgba(160,120,255,0.15)]" style={{ background: "rgba(26,26,26,0.6)", border: "2px solid #a078ff" }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#a078ff]/20 rounded-full blur-[64px] translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 rounded-md mb-4 font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[#d0bcff]" style={{ background: "rgba(160,120,255,0.15)", border: "1px solid rgba(160,120,255,0.25)" }}>Most Popular</div>
                  <h3 className="font-display text-2xl font-bold mb-2 text-white">Pro</h3>
                  <div className="text-5xl font-bold mb-6 text-white">$19<span className="text-lg text-[#958ea0] font-normal">/mo</span></div>
                  <p className="text-[#958ea0] mb-8 text-sm">For creators and professionals.</p>
                  <ul className="space-y-4 mb-10 flex-1">
                    {["Unlimited upscales", "Priority processing", "Up to 8x magnification", "API Access"].map((item, i) => (<li key={i} className="flex items-center gap-3 text-[#e5e2e1] text-sm"><CheckCircle className="w-5 h-5 text-[#a078ff] flex-shrink-0" /><span>{item}</span></li>))}
                  </ul>
                  <Link href="/login" className="block w-full py-3 px-6 rounded-lg font-bold bg-[#a078ff] text-[#050505] text-center hover:shadow-[0_0_20px_rgba(160,120,255,0.5)] transition-all" style={{ borderTop: "0.5px solid rgba(255,255,255,0.3)" }}>Upgrade to Pro</Link>
                </div>
              </motion.div>
              {/* Premium */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="p-8 rounded-xl flex flex-col" style={{ background: "rgba(26,26,26,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 className="font-display text-xl font-semibold mb-2 text-white">Premium</h3>
                <div className="text-4xl font-bold mb-6 text-white">$99<span className="text-lg text-[#958ea0] font-normal">/mo</span></div>
                <p className="text-[#958ea0] mb-8 text-sm">For high-volume teams.</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {["Unlimited everything", "Dedicated GPU cluster", "Custom integrations", "24/7 Phone support"].map((item, i) => (<li key={i} className="flex items-center gap-3 text-[#cbc3d7] text-sm"><CheckCircle className="w-5 h-5 text-[#a078ff] flex-shrink-0" /><span>{item}</span></li>))}
                </ul>
                <Link href="/login" className="block w-full py-3 px-6 rounded-lg font-bold text-center text-white transition-colors" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>Upgrade to Premium</Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="px-6 text-center relative" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-[50vw] h-[50vw] rounded-full bg-[#4C1D95]/8 blur-[180px]" /></div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 max-w-4xl mx-auto">
            <h2 className="font-display text-[clamp(40px,6vw,72px)] font-extrabold tracking-[-0.04em] leading-[1.1] mb-8 text-white">Bring Every Pixel<br />Back To <span className="bg-gradient-to-r from-[#d0bcff] to-[#5de6ff] bg-clip-text text-transparent">Life.</span></h2>
            <Link href="/editor" className="inline-flex items-center gap-3 bg-[#a078ff] text-[#050505] px-10 py-5 rounded-lg font-bold text-lg hover:shadow-[0_0_40px_rgba(160,120,255,0.5)] hover:brightness-110 transition-all" style={{ borderTop: "0.5px solid rgba(255,255,255,0.3)" }}>
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="py-12 text-center relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "#050505" }}>
        <p className="text-[#494454] text-sm">© {new Date().getFullYear()} Tensric. All rights reserved.</p>
      </footer>
    </div>
  );
}
