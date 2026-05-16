"use client";

import { motion } from "framer-motion";
import { Sparkles, Target, Eye, Heart, Cpu, Server, Lock, Zap } from "lucide-react";
import Link from "next/link";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen text-slate-50 font-sans selection:bg-blue-600/30 overflow-x-hidden relative">
      {/* Ambient Radial Gradient Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-blue-900/10 blur-[150px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Tensric</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/about" className="text-white transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-bold bg-gradient-to-r from-blue-700 to-blue-500 text-white px-5 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(29,78,216,0.5)] transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-40">
        {/* Hero */}
        <section className="px-6 text-center max-w-4xl mx-auto mb-32">
          <motion.div initial="hidden" animate="show" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="inline-block px-3 py-1 glass text-blue-400 text-xs font-bold rounded-full mb-6 tracking-wider uppercase">
              About Tensric
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              We Build the Future of <br className="hidden md:block"/> Creative AI.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 font-medium leading-relaxed">
              Our goal is to make professional-grade image processing accessible to everyone. We believe in the power of neural networks to restore, enhance, and breathe new life into visual media without compromising privacy or quality.
            </motion.p>
          </motion.div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="px-6 max-w-7xl mx-auto mb-32">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Target, title: "Our Mission", desc: "To provide the world's fastest, most accurate AI upscaling API, giving creators back their time." },
              { icon: Eye, title: "Our Vision", desc: "A future where low-resolution media is a thing of the past, and every pixel tells a perfect story." },
              { icon: Heart, title: "Our Values", desc: "Privacy first, uncompromising quality, and continuous innovation in machine learning." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-blue-600/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Timeline */}
        <section className="px-6 max-w-4xl mx-auto mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold mb-16 text-center"
          >
            Building the Future
          </motion.h2>
          
          <div className="space-y-12">
            {[
              { year: "2023", title: "The Foundation", desc: "Tensric was born out of a need for better texture preservation in AI upscaling." },
              { year: "2024", title: "Real-ESRGAN Integration", desc: "We adopted and heavily optimized the v3 models for our cloud infrastructure." },
              { year: "2025", title: "Enterprise Scaling", desc: "Launched our dedicated API, processing over 1 million images daily." },
              { year: "2026", title: "The Next Generation", desc: "Introducing real-time upscaling for video pipelines." },
            ].map((event, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                  {i !== 3 && <div className="w-[2px] h-full bg-slate-800 my-2" />}
                </div>
                <div className="pb-8">
                  <span className="text-blue-500 font-bold tracking-wider text-sm">{event.year}</span>
                  <h3 className="font-display text-2xl font-bold mt-1 mb-2">{event.title}</h3>
                  <p className="text-slate-400">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section className="px-6 pb-32 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold mb-4">Our Technology</h2>
            <p className="text-slate-400">Powered by the best in class open-source models.</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              { icon: Cpu, title: "NVIDIA H100 Cluster", desc: "All inferences run on bare-metal H100 GPUs for maximum throughput." },
              { icon: Zap, title: "TensorRT Optimization", desc: "Models are compiled with TensorRT to achieve 3x faster inference times." },
              { icon: Lock, title: "Zero-Retention Architecture", desc: "Images are processed entirely in memory and immediately discarded." },
              { icon: Server, title: "Edge Routing", desc: "Requests are automatically routed to the closest global GPU region." },
            ].map((tech, i) => (
              <motion.div key={i} variants={fadeUp} className="glass p-8 rounded-3xl flex items-start gap-6 border-none">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
                  <tech.icon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">{tech.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{tech.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

      </main>

      <footer className="py-12 text-center border-t border-slate-800 relative z-10 bg-slate-950">
        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Tensric. All rights reserved.</p>
      </footer>
    </div>
  );
}
