"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield, Image as ImageIcon, Layers, Cpu, CheckCircle } from "lucide-react";
import Link from "next/link";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

function ImageComparisonSlider() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Exact slider logic as requested
  const [sliderPosition, setSliderPosition] = useState(50);

  // 3D Tilt logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Exceptionally smooth, fluid, and buttery spring physics
  const mouseXSpring = useSpring(x, { stiffness: 60, damping: 15, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 60, damping: 15, mass: 0.5 });
  
  // Significantly increased tilt intensity
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["25deg", "-25deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "25deg"]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Slider target update
    const pointerX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (pointerX / rect.width) * 100;
    setSliderPosition(percent);

    // Tilt logic
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handlePointerLeave = () => {
    setSliderPosition(50);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      style={{ rotateX, rotateY, perspective: 1200 }}
      className="w-full max-w-6xl mx-auto aspect-video shadow-2xl shadow-blue-900/40 rounded-3xl"
    >
      <div 
        ref={containerRef}
        className="relative w-full h-full rounded-3xl overflow-hidden cursor-crosshair select-none border border-white/5"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 1. BOTTOM LAYER (High-Res / After - always visible underneath) */}
        <img 
          src="/oussamine-high.jpg" 
          alt="High Resolution After Upscaling" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0" 
        />
        
        {/* 2. TOP LAYER (Low-Res / Before - masked by the slider position) */}
        <img 
          src="/oussamine-low.jpg" 
          alt="Low Resolution Before" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10" 
          style={{ clipPath: `inset(0 calc(100% - ${sliderPosition}%) 0 0)` }}
        />

        {/* 3. SLIDER DIVIDER (The vertical line) */}
        <div 
          className="absolute inset-y-0 w-[2px] bg-white/60 backdrop-blur shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none z-20 transition-all duration-75 ease-out"
          style={{ left: `${sliderPosition}%` }}
        />

        {/* Floating Badges */}
        <div 
          className="absolute bottom-6 left-6 glass px-4 py-2 rounded-xl flex items-center gap-2 pointer-events-none z-30 border border-white/10 shadow-xl"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
          <span className="text-xs font-bold tracking-wider text-white">REAL-ESRGAN V3</span>
        </div>
        <div 
          className="absolute bottom-6 right-6 glass px-4 py-2 rounded-xl pointer-events-none z-30 border border-white/10 shadow-xl bg-blue-900/20"
          style={{ transform: "translateZ(30px)" }}
        >
          <span className="text-xs font-bold text-white tracking-wider">4X UPSCALED</span>
        </div>
      </div>
    </motion.div>
  );
}

function TiltFeatureCard({ feature }: { feature: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div 
      variants={fadeUp}
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      <div className="bg-slate-900 h-full border border-slate-800 p-8 rounded-3xl hover:border-blue-600/50 hover:shadow-[0_0_20px_rgba(29,78,216,0.15)] transition-colors duration-300 transform-gpu" style={{ transformStyle: "preserve-3d" }}>
        <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6" style={{ transform: "translateZ(20px)" }}>
          <feature.icon className="w-6 h-6 text-blue-500" />
        </div>
        <h3 className="font-display text-xl font-bold mb-3" style={{ transform: "translateZ(10px)" }}>{feature.title}</h3>
        <p className="text-slate-400 leading-relaxed" style={{ transform: "translateZ(5px)" }}>{feature.desc}</p>
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen text-slate-50 font-sans selection:bg-blue-600/30 overflow-x-hidden relative">
      {/* Ambient Radial Gradient Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-900/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-800/10 blur-[150px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Tensric</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium hover:text-blue-400 transition-colors">
              Sign In
            </Link>
            <Link 
              href="/login" 
              className="text-sm font-bold bg-gradient-to-r from-blue-700 to-blue-500 text-white px-5 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(29,78,216,0.5)] transition-all transform hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32">
        {/* Hero Section */}
        <section className="px-6 pb-24 pt-10 flex flex-col items-center text-center">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center max-w-4xl mx-auto mb-16"
          >
            <motion.div variants={fadeUp} className="inline-block px-3 py-1 glass text-blue-400 text-xs font-bold rounded-full mb-6 tracking-wider">
              V3.0 IS NOW LIVE
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              4X Clarity.<br />
              Zero Artifacts.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
              Professional AI image upscaling powered by state-of-the-art neural networks. Restore details, remove noise, and breathe new life into your visuals instantly.
            </motion.p>
            <motion.div variants={fadeUp} className="flex justify-center w-full">
              <Link 
                href="/login" 
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-[0_0_30px_rgba(29,78,216,0.5)] hover:scale-105"
              >
                Start Upscaling For Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full px-4 lg:px-0"
          >
            <ImageComparisonSlider />
          </motion.div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="py-24 px-6 bg-slate-900/50 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-3 block">Features</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Everything You Need to Create</h2>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { icon: Zap, title: "Lightning Fast", desc: "Process 4K images in seconds with our optimized cloud infrastructure." },
                { icon: ImageIcon, title: "Lossless Detail", desc: "Advanced AI models preserve textures while eliminating compression artifacts." },
                { icon: Shield, title: "Secure Storage", desc: "Your original and upscaled assets are encrypted and stored safely." },
                { icon: Layers, title: "Batch Processing", desc: "Upscale hundreds of images at once with our bulk upload tool." },
                { icon: Cpu, title: "Multiple Models", desc: "Choose between specialized models for art, photos, and anime." },
                { icon: Sparkles, title: "API Access", desc: "Integrate our upscaling engine directly into your own workflow." },
              ].map((feature, i) => (
                <TiltFeatureCard key={i} feature={feature} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Showcase Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold mb-4">Stunning Results</h2>
            <p className="text-slate-400">See the magic of deep learning applied to real images.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
            ].map((src, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
              >
                <img 
                  src={src} 
                  alt="Showcase example" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white font-medium flex items-center gap-2">
                    View Details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-32 px-6 bg-slate-900/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-slate-400">Start for free, upgrade when you need more power.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
              {/* Starter Plan */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col"
              >
                <h3 className="font-display text-xl font-bold mb-2">Starter</h3>
                <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                <p className="text-slate-400 mb-8 text-sm">Perfect for occasional use and testing.</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {["10 upscales/month", "Standard speed", "Up to 2x magnification"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="w-full py-3 rounded-xl font-bold bg-slate-800 text-center hover:bg-slate-700 transition-colors">
                  Get Started
                </Link>
              </motion.div>

              {/* Pro Plan */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-10 rounded-3xl bg-slate-900 border-2 border-blue-600 flex flex-col relative shadow-[0_0_30px_rgba(29,78,216,0.2)] md:-translate-y-4"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">Most Popular</div>
                  <h3 className="font-display text-2xl font-bold mb-2 text-white">Pro</h3>
                  <div className="text-5xl font-bold mb-6 text-white">$19<span className="text-lg text-slate-400 font-normal">/mo</span></div>
                  <p className="text-slate-400 mb-8 text-sm">For creators and professionals.</p>
                  <ul className="space-y-4 mb-10 flex-1">
                    {["Unlimited upscales", "Priority processing", "Up to 8x magnification", "API Access"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-medium text-slate-200 text-sm">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/login" className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 text-white text-center hover:shadow-[0_0_15px_rgba(29,78,216,0.5)] transition-all">
                    Upgrade to Pro
                  </Link>
                </div>
              </motion.div>

              {/* Enterprise Plan */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col"
              >
                <h3 className="font-display text-xl font-bold mb-2">Enterprise</h3>
                <div className="text-4xl font-bold mb-6">$99<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                <p className="text-slate-400 mb-8 text-sm">For high volume teams.</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {["Unlimited everything", "Dedicated GPU cluster", "Custom integrations", "24/7 Phone support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="w-full py-3 rounded-xl font-bold bg-slate-800 text-center hover:bg-slate-700 transition-colors">
                  Contact Sales
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-white/5 relative z-10 bg-slate-950">
        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Tensric. All rights reserved.</p>
      </footer>
    </div>
  );
}
