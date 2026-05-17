/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useCallback } from "react";
import { Sparkles, Image as ImageIcon, Settings, CreditCard, UploadCloud, ZoomIn, Crop, FlipHorizontal, Zap, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function EditorPage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [scale, setScale] = useState(4);
  const [aiModel, setAiModel] = useState("precision");
  const [noiseReduction, setNoiseReduction] = useState(45);
  const [sharpening, setSharpening] = useState(20);
  const [deblocking, setDeblocking] = useState(62);
  const [fixMoire, setFixMoire] = useState(false);
  const [colorRestoration, setColorRestoration] = useState(true);

  // App State
  const [hasUploadedImage, setHasUploadedImage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUpscaled, setIsUpscaled] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image comparison slider state
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  }, [isDragging, handleSliderMove]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragging) {
      handleSliderMove(e.touches[0].clientX);
    }
  }, [isDragging, handleSliderMove]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUserImageUrl(url);
      setHasUploadedImage(true);
      setIsUpscaled(false);
      setProgress(0);
      setSliderPosition(50);
    }
  };

  const handleRunUpscaler = () => {
    if (!hasUploadedImage || isProcessing || isUpscaled) return;
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate processing
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          setIsUpscaled(true);
        }, 500);
      }
      setProgress(currentProgress);
    }, 400);
  };

  return (
    <div className="h-screen flex text-white font-sans overflow-hidden">
      
      {/* Left Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-slate-900/60 backdrop-blur-xl flex flex-col py-8 border border-slate-800 rounded-[2rem] z-30 shrink-0 ml-4 my-auto h-fit"
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-[14px] top-16 z-50 w-7 h-7 rounded-full bg-blue-600 border-[3px] border-slate-950 flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
        >
          <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
            <ChevronLeft className="w-3 h-3" strokeWidth={3} />
          </motion.div>
        </button>

        <div className={`px-6 mb-8 flex flex-col ${isCollapsed ? 'items-center' : 'items-start'}`}>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-display font-bold text-xl tracking-tight text-white whitespace-nowrap overflow-hidden"
                >
                  Tensric
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-[10px] uppercase tracking-widest text-slate-400 mt-2 whitespace-nowrap overflow-hidden"
              >
                High-Performance Synthesis
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex flex-col gap-2 px-3 mt-4">
          <Link href="/editor" className={`bg-slate-800 text-blue-500 rounded-xl py-3 flex items-center transition-all duration-200 font-medium ${isCollapsed ? 'justify-center px-0' : 'px-4 gap-3'}`}>
            <ImageIcon className="w-5 h-5 shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  Upscaler
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link href="/settings" className={`text-slate-400 py-3 flex items-center hover:bg-slate-800/50 hover:text-white rounded-xl transition-all duration-200 font-medium ${isCollapsed ? 'justify-center px-0' : 'px-4 gap-3 hover:translate-x-1'}`}>
            <Settings className="w-5 h-5 shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link href="/billing" className={`text-slate-400 py-3 flex items-center hover:bg-slate-800/50 hover:text-white rounded-xl transition-all duration-200 font-medium ${isCollapsed ? 'justify-center px-0' : 'px-4 gap-3 hover:translate-x-1'}`}>
            <CreditCard className="w-5 h-5 shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  Billing
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </nav>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20, margin: 0, padding: 0 }}
              className="mt-8 p-4 mx-4 mb-0 bg-slate-950 rounded-xl border border-white/5 overflow-hidden"
            >
              <p className="text-[10px] font-bold mb-2 text-slate-400 uppercase tracking-wider whitespace-nowrap">Storage Limit</p>
              <div className="w-full bg-slate-900 h-1.5 rounded-full mb-2">
                <div className="bg-blue-600 w-3/4 h-1.5 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              </div>
              <p className="text-[10px] text-slate-500 whitespace-nowrap">750MB of 1GB used</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>

      {/* Main Workspace */}
      <section className="flex-1 flex overflow-hidden">
        
        {/* Central Canvas */}
        <div className="flex-1 flex flex-col p-8 overflow-y-auto">
          
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="font-display text-4xl lg:text-5xl leading-tight font-extrabold tracking-tight text-white mb-2">Editor Workspace</h1>
              <p className="text-slate-400 text-sm font-medium">Enhance clarity and detail with our proprietary AI models.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 rounded-xl font-bold text-blue-500 transition-all hover:bg-slate-900">Discard</button>
              <button className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold shadow-[0_0_20px_rgba(29,78,216,0.4)] active:scale-[0.98] transition-all hover:brightness-110">Export Result</button>
            </div>
          </div>

          {/* Comparison Preview Area */}
          <div
            ref={sliderRef}
            className={`relative flex-1 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group min-h-[500px] select-none ${!isUpscaled ? 'flex items-center justify-center' : ''}`}
            {...(isUpscaled ? {
              onMouseDown: handleMouseDown,
              onMouseUp: handleMouseUp,
              onMouseMove: handleMouseMove,
              onMouseLeave: handleMouseUp,
              onTouchStart: handleMouseDown,
              onTouchEnd: handleMouseUp,
              onTouchMove: handleTouchMove,
              style: { cursor: isDragging ? 'grabbing' : 'col-resize' }
            } : {})}
          >
            {!hasUploadedImage && (
              <div className="flex flex-col items-center justify-center text-center p-8">
                <ImageIcon className="w-16 h-16 text-slate-700 mb-4" />
                <h3 className="font-display text-2xl font-bold text-white mb-2">No Image Selected</h3>
                <p className="text-slate-400">Please upload an image below to begin upscaling.</p>
              </div>
            )}

            {hasUploadedImage && !isProcessing && !isUpscaled && (
              <>
                <img 
                  alt="Original Image" 
                  className="absolute inset-0 w-full h-full object-cover" 
                  src={userImageUrl || ""}
                  draggable={false}
                />
                <div className="absolute top-4 left-4 bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 z-10">
                  <span className="text-xs font-bold text-slate-300 tracking-wider uppercase">Original (Ready to process)</span>
                </div>
              </>
            )}

            {hasUploadedImage && isProcessing && (
              <>
                <img 
                  alt="Processing Image" 
                  className="absolute inset-0 w-full h-full object-cover brightness-50" 
                  src={userImageUrl || ""}
                  draggable={false}
                />
                <motion.div 
                  className="absolute inset-0 border-t-2 border-blue-500 bg-gradient-to-b from-blue-500/20 to-transparent z-10"
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle cx="48" cy="48" r="44" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-800" />
                      <circle 
                        cx="48" cy="48" r="44" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        className="text-blue-500 transition-all duration-300 ease-out" 
                        strokeDasharray={`${2 * Math.PI * 44}`} 
                        strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`} 
                      />
                    </svg>
                    <span className="font-bold text-xl text-white relative z-10">{progress}%</span>
                  </div>
                  <p className="mt-4 font-bold text-blue-400 animate-pulse tracking-wider text-sm uppercase">Enhancing Detail...</p>
                </div>
              </>
            )}

            {hasUploadedImage && isUpscaled && (
              <>
                <img 
                  alt="Upscaled Image" 
                  className="absolute inset-0 w-full h-full object-cover" 
                  src={userImageUrl || ""}
                  draggable={false}
                />
                <div className="absolute top-4 right-4 bg-blue-900/20 backdrop-blur-md px-4 py-2 rounded-xl border border-blue-500/30 z-10">
                  <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">Upscaled ({scale === 2 ? '1440p' : scale === 4 ? '4K' : '8K'} AI)</span>
                </div>

                <div
                  className="absolute inset-0 z-10"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img 
                    alt="Original Image" 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40" 
                    src={userImageUrl || ""}
                    draggable={false}
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 z-10">
                    <span className="text-xs font-bold text-slate-300 tracking-wider uppercase">Original (720p)</span>
                  </div>
                </div>

                <div
                  className="absolute inset-y-0 z-20 flex items-center justify-center pointer-events-none"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="absolute inset-y-0 w-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                  <div className="relative w-10 h-10 rounded-full bg-slate-900 shadow-xl flex items-center justify-center border border-blue-500/50 backdrop-blur-md">
                    <div className="flex gap-1">
                      <div className="w-1 h-3 bg-blue-400 rounded-full" />
                      <div className="w-1 h-3 bg-blue-400 rounded-full" />
                    </div>
                  </div>
                </div>

                <button className="absolute bottom-24 right-6 z-30 bg-white text-blue-900 p-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                </button>
              </>
            )}

            {hasUploadedImage && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-6 border border-white/10 shadow-[0_24px_48px_rgba(0,0,0,0.5)] z-30 pointer-events-auto">
                <button className="flex flex-col items-center gap-1 group" onClick={(e) => e.stopPropagation()}>
                  <ZoomIn className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400 group-hover:text-blue-500">Zoom</span>
                </button>
                <div className="w-px h-6 bg-slate-700" />
                <button className="flex flex-col items-center gap-1 group" onClick={(e) => e.stopPropagation()}>
                  <Crop className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400 group-hover:text-blue-500">Crop</span>
                </button>
                <div className="w-px h-6 bg-slate-700" />
                <button className="flex flex-col items-center gap-1 group" onClick={(e) => e.stopPropagation()}>
                  <FlipHorizontal className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400 group-hover:text-blue-500">Mirror</span>
                </button>
              </div>
            )}
          </div>

          {/* Bento Grid Upload Area */}
          <div className="mt-8 grid grid-cols-12 gap-6">
            <div onClick={handleUploadClick} className="col-span-8 bg-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-blue-900/10 hover:border-blue-500/30 border border-slate-800 transition-all cursor-pointer group">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" className="hidden" />
              <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <UploadCloud className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-display font-bold text-white text-lg">Click or drag images to upscale</h3>
              <p className="text-slate-400 text-sm mt-1 font-medium">Supports JPG, PNG, WEBP (Max 50MB)</p>
            </div>
            
            <div className="col-span-4 bg-slate-900 rounded-2xl p-6 flex flex-col justify-between border border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-2 block">Quick Action</span>
                <h4 className="font-display font-bold text-white leading-tight text-lg">Apply presets to multiple images</h4>
              </div>
              <button className="w-full py-3 bg-transparent border border-white/10 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all mt-4">
                Select Batch
              </button>
            </div>
          </div>
          
        </div>

        {/* Parameters Sidebar */}
        <aside className="w-80 bg-slate-900 flex flex-col overflow-y-auto border-l border-white/5">
          <div className="p-6 border-b border-white/5">
            <h2 className="font-display text-xl tracking-tight font-bold text-white">Parameters</h2>
            <p className="text-xs text-slate-400 mt-1 font-medium">Fine-tune the AI processing</p>
          </div>
          
          <div className="p-6 flex flex-col gap-8 flex-1">
            
            {/* Scale Factor */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-bold text-sm text-slate-400 uppercase tracking-tight">Upscale Factor</label>
                <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md">{scale}x</span>
              </div>
              <div className="grid grid-cols-3 bg-slate-950 rounded-lg p-1 border border-white/5">
                {[2, 4, 8].map((val) => (
                  <button 
                    key={val}
                    onClick={() => setScale(val)}
                    className={`py-2 rounded-md text-xs font-bold transition-all ${scale === val ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                  >
                    {val}x
                  </button>
                ))}
              </div>
            </div>

            {/* AI Model */}
            <div className="space-y-3">
              <label className="font-bold text-sm text-slate-400 uppercase tracking-tight">AI Model</label>
              <div className="flex flex-col gap-2">
                <div 
                  onClick={() => setAiModel("precision")}
                  className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all ${aiModel === "precision" ? 'bg-slate-950 border border-blue-500/40 shadow-lg' : 'bg-slate-950/50 border border-transparent hover:bg-slate-950'}`}
                >
                  <div className={`w-3 h-3 rounded-full ${aiModel === "precision" ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-slate-700'}`} />
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${aiModel === "precision" ? 'text-white' : 'text-slate-400'}`}>Precision Pro v3</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">Best for landscapes & textures</p>
                  </div>
                </div>
                
                <div 
                  onClick={() => setAiModel("face")}
                  className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all ${aiModel === "face" ? 'bg-slate-950 border border-blue-500/40 shadow-lg' : 'bg-slate-950/50 border border-transparent hover:bg-slate-950'}`}
                >
                  <div className={`w-3 h-3 rounded-full ${aiModel === "face" ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-slate-700'}`} />
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${aiModel === "face" ? 'text-white' : 'text-slate-400'}`}>Face Enhance</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">Optimized for portraits</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-400 uppercase">Noise Reduction</label>
                  <span className="text-xs font-bold text-blue-500">{noiseReduction}%</span>
                </div>
                <input type="range" min="0" max="100" value={noiseReduction} onChange={(e) => setNoiseReduction(Number(e.target.value))} className="w-full accent-blue-600" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-400 uppercase">Sharpening</label>
                  <span className="text-xs font-bold text-blue-500">{sharpening}%</span>
                </div>
                <input type="range" min="0" max="100" value={sharpening} onChange={(e) => setSharpening(Number(e.target.value))} className="w-full accent-blue-600" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-400 uppercase">Deblocking</label>
                  <span className="text-xs font-bold text-blue-500">{deblocking}%</span>
                </div>
                <input type="range" min="0" max="100" value={deblocking} onChange={(e) => setDeblocking(Number(e.target.value))} className="w-full accent-blue-600" />
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setFixMoire(!fixMoire)}>
                <span className={`text-xs font-bold ${fixMoire ? 'text-white' : 'text-slate-400'}`}>Fix Moiré Patterns</span>
                <div className={`w-10 h-6 rounded-full p-1 transition-colors flex items-center ${fixMoire ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'}`}>
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setColorRestoration(!colorRestoration)}>
                <span className={`text-xs font-bold ${colorRestoration ? 'text-white' : 'text-slate-400'}`}>Color Restoration</span>
                <div className={`w-10 h-6 rounded-full p-1 transition-colors flex items-center ${colorRestoration ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'}`}>
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
            
          </div>

          {/* Sticky Bottom Button */}
          <div className="mt-auto p-6 bg-slate-950/50 border-t border-white/5">
            <button 
              onClick={handleRunUpscaler}
              disabled={!hasUploadedImage || isProcessing || isUpscaled}
              className="w-full py-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(29,78,216,0.3)] active:scale-95 transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:active:scale-100"
            >
              <Zap className="w-5 h-5" />
              {isProcessing ? "Processing..." : isUpscaled ? "Upscaled!" : "Run Upscaler"}
            </button>
          </div>
        </aside>

      </section>
    </div>
  );
}
