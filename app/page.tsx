import React from 'react';

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 selection:text-white" data-mode="connect">
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          vertical-align: middle;
        }
        .glass-overlay {
          background: rgba(132, 173, 255, 0.1);
          backdrop-filter: blur(20px);
        }
        .primary-gradient {
          background: linear-gradient(135deg, #84adff 0%, #0070ea 100%);
        }
        .ambient-shadow {
          box-shadow: 0px 24px 48px rgba(0, 0, 0, 0.5);
        }
        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: #333333;
          border-radius: 2px;
        }
        input[type=range]::-webkit-slider-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #84adff;
          cursor: pointer;
          -webkit-appearance: none;
          margin-top: -7px;
          border: none;
          box-shadow: 0 0 10px rgba(132, 173, 255, 0.4);
        }
      `}} />

      {/* TopNavBar Shared Component */}
      <header className="fixed top-0 w-full z-50 bg-surface h-16">
        <div className="flex justify-between items-center h-16 px-6 w-full max-w-[1920px] mx-auto font-['Manrope'] antialiased">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold tracking-tight text-white">Obsidian Lens</span>
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-sm font-bold text-[#84adff]" href="#">Home</a>
              <a className="text-sm font-medium text-[#adaaaa] hover:bg-[#2c2c2c] px-2 py-1 rounded transition-colors duration-200" href="#">Gallery</a>
              <a className="text-sm font-medium text-[#adaaaa] hover:bg-[#2c2c2c] px-2 py-1 rounded transition-colors duration-200" href="#">Pricing</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-[#adaaaa] p-2 hover:bg-[#2c2c2c] rounded-full transition-colors active:scale-95">notifications</button>
            <button className="material-symbols-outlined text-[#adaaaa] p-2 hover:bg-[#2c2c2c] rounded-full transition-colors active:scale-95">settings</button>
            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#2c2c2c] border border-[#333333]">
              <img alt="User profile avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgXbTVkEyNVsmIBITzBY5R0O9XkZrmrdvhh7E43IlGknYzUSy-8hulgp5IgkNV6ZHflp9-DRzlhXExaUH7LS99gRrMXy3rLMjMmPb4TduJfBVOn2J0nx4zovU0JlVw3sluEvme2TPXCD8Qvi-CvoYs9AYwrTrqbOSNdTIZPtBK8O5tBTuBkNnf4z_YgqMzkHFSxAu_ndkyXtHKkvJ7LnVdYAkzbZtgwf1dVrOuWOsCwi0fFhx3C6qovcOxeJU0fLWiQojC0XcwVTs"/>
            </div>
          </div>
        </div>
      </header>
      <main className="flex h-screen pt-16 overflow-hidden">
        {/* SideNavBar Shared Component */}
        <aside className="fixed left-0 h-full w-64 bg-surface-container-low flex flex-col gap-2 pt-8 font-['Manrope'] text-sm font-medium">
          <div className="px-6 py-4 mb-2">
            <h2 className="text-[1.5rem] tracking-tight font-black text-white leading-tight">Obsidian Lens</h2>
            <p className="text-[10px] uppercase tracking-widest text-[#adaaaa]">High-Performance Synthesis</p>
          </div>
          <nav className="flex flex-col gap-1">
            <a className="bg-[#262626] text-[#84adff] rounded-md mx-2 px-4 py-3 flex items-center gap-3 transition-all duration-200" href="#">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              Upscaler
            </a>
            <a className="text-[#adaaaa] mx-2 px-4 py-3 flex items-center gap-3 hover:bg-[#1a1a1a] hover:text-white transition-all hover:translate-x-1 duration-200" href="#">
              <span className="material-symbols-outlined">face</span>
              Avatar
            </a>
            <a className="text-[#adaaaa] mx-2 px-4 py-3 flex items-center gap-3 hover:bg-[#1a1a1a] hover:text-white transition-all hover:translate-x-1 duration-200" href="#">
              <span className="material-symbols-outlined">grid_view</span>
              Gallery
            </a>
            <a className="text-[#adaaaa] mx-2 px-4 py-3 flex items-center gap-3 hover:bg-[#1a1a1a] hover:text-white transition-all hover:translate-x-1 duration-200" href="#">
              <span className="material-symbols-outlined">payments</span>
              Billing
            </a>
          </nav>
          <div className="mt-auto p-4 mx-2 mb-20 bg-[#1a1a1a] rounded-xl border border-[#333333]/30">
            <p className="text-[10px] font-bold mb-2 text-[#adaaaa] uppercase tracking-wider">Storage Limit</p>
            <div className="w-full bg-[#0e0e0e] h-1.5 rounded-full mb-2">
              <div className="bg-[#007BFF] w-3/4 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,123,255,0.5)]"></div>
            </div>
            <p className="text-[10px] text-[#adaaaa]/60">750MB of 1GB used</p>
          </div>
        </aside>
        {/* Main Workspace */}
        <section className="flex-1 ml-64 bg-surface flex overflow-hidden">
          {/* Central Canvas */}
          <div className="flex-1 flex flex-col p-8 overflow-y-auto">
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h1 className="font-headline text-[3.5rem] leading-tight font-extrabold tracking-tight text-white mb-2">Editor Workspace</h1>
                <p className="text-[#adaaaa] text-sm">Enhance clarity and detail with our proprietary AI models.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-2.5 rounded-md font-headline text-sm font-bold text-primary transition-all hover:bg-surface-bright">Discard</button>
                <button className="px-8 py-2.5 rounded-md primary-gradient text-white font-headline text-sm font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all hover:bg-surface-bright">Export Result</button>
              </div>
            </div>
            {/* Comparison Preview Area */}
            <div className="relative flex-1 rounded-xl overflow-hidden bg-[#131313] border border-[#1a1a1a] shadow-2xl group min-h-[500px]">
              <div className="absolute inset-0 flex">
                {/* Left: Original */}
                <div className="relative w-1/2 overflow-hidden border-r-2 border-[#007BFF]/30">
                  <img alt="Original Image" className="absolute inset-0 w-[200%] h-full object-cover grayscale opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVFmrRtfUnqDdBA_9T3HZNEtokp2puZcCg9l6yqb-3lTxWvLL8e85VRjysVahsAWHdl8RvZpYJbqFG-nhhqt1PAG5MJnbnF-juSqemFtGRrtoqBubPDMDYIAxHJ7CCpZROFgszFeIwt1_s4vXVG3ur4ny6P677GvQwOTxZ-h_j7R0qY0whlDEQ1cKGxZf8lg05OXP87XDVjbKnank-ihytKW5y90EcPHlewcRycX_oaqJvqIiz50A__L_JtqsoeOAPfL6Pz3xQ1-o"/>
                  <div className="absolute top-4 left-4 glass-overlay px-3 py-1.5 rounded-lg border border-[#333333]">
                    <span className="text-xs font-bold text-secondary tracking-wider uppercase">Original (720p)</span>
                  </div>
                </div>
                {/* Right: Upscaled */}
                <div className="relative w-1/2 overflow-hidden">
                  <img alt="Upscaled Image" className="absolute right-0 w-[200%] h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfGmHfXd8gaI5oKoq4xegbf7_tPWLKXvFc9Y9oH3A1WsCSpE_mWrmwRXph5_ekTYdf3_tel4Vx-ebVZHuPZOACdAaBAWdPQ7icSi0AeQFLgVIoGjs3jt9vDIL9YCxI_o0esxVa4GdoZUNCIYLo5yhyVKFtCMF4Cv4Wlqq0bFqSCcO-IGoE5vvyo96p0j-jNDjG7E_WWVajSPJju1dbewliDjIhrgP6VtVmTvOUvXjbugmldk8upbCS8IPMnnha8Yke14h5iy9RfcU"/>
                  <div className="absolute top-4 right-4 glass-overlay px-3 py-1.5 rounded-lg border border-[#007BFF]/30">
                    <span className="text-xs font-bold text-secondary tracking-wider uppercase">Upscaled (4K AI)</span>
                  </div>
                </div>
              </div>
              {/* Comparison Handle */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-primary z-10 flex items-center justify-center shadow-[0_0_15px_rgba(132,173,255,0.6)]">
                <div className="w-10 h-10 rounded-full bg-surface shadow-xl flex items-center justify-center cursor-ew-resize border border-primary/50 glass-overlay">
                  <span className="material-symbols-outlined text-primary text-xl">unfold_more</span>
                </div>
              </div>
              {/* Bottom Floating Toolbar */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-overlay px-6 py-3 rounded-full flex items-center gap-6 border border-outline-variant/15 ambient-shadow">
                <button className="flex flex-col items-center gap-1 group">
                  <span className="material-symbols-outlined text-[#adaaaa] group-hover:text-[#007BFF] transition-colors">zoom_in</span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-[#adaaaa]">Zoom</span>
                </button>
                <div className="w-px h-6 bg-[#333333]"></div>
                <button className="flex flex-col items-center gap-1 group">
                  <span className="material-symbols-outlined text-[#adaaaa] group-hover:text-[#007BFF] transition-colors">crop</span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-[#adaaaa]">Crop</span>
                </button>
                <div className="w-px h-6 bg-[#333333]"></div>
                <button className="flex flex-col items-center gap-1 group">
                  <span className="material-symbols-outlined text-[#adaaaa] group-hover:text-[#007BFF] transition-colors">flip</span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-[#adaaaa]">Mirror</span>
                </button>
              </div>
            </div>
            {/* Bento Grid Upload Area */}
            <div className="mt-8 grid grid-cols-12 gap-6">
              <div className="col-span-8 bg-surface-container-low rounded-xl p-8 flex flex-col items-center justify-center hover:bg-primary-container/20 hover:border-primary/15 border border-transparent transition-all cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-surface-container border border-outline flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:shadow-[0_0_20px_rgba(132,173,255,0.2)]">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_upload</span>
                </div>
                <h3 className="font-headline font-bold text-white">Click or drag images to upscale</h3>
                <p className="text-on-surface-variant text-sm mt-1">Supports JPG, PNG, WEBP (Max 50MB)</p>
              </div>
              <div className="col-span-4 bg-surface-container-low rounded-xl p-6 flex flex-col justify-between border border-surface-container">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Quick Action</span>
                  <h4 className="font-headline font-bold text-white leading-tight">Apply presets to multiple images</h4>
                </div>
                <button className="w-full py-3 bg-transparent border border-outline-variant/15 text-white rounded-md font-headline text-xs font-bold hover:bg-surface-container-highest transition-all">Select Batch</button>
              </div>
            </div>
          </div>
          {/* Parameters Sidebar */}
          <aside className="w-80 bg-surface-container-low flex flex-col overflow-y-auto">
            <div className="p-6">
              <h2 className="font-headline text-[1.5rem] tracking-tight font-bold text-white">Parameters</h2>
              <p className="text-xs text-[#adaaaa] mt-1">Fine-tune the AI processing</p>
            </div>
            <div className="p-6 flex flex-col gap-8">
              {/* Scale Factor */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-label font-bold text-sm text-[#adaaaa] uppercase tracking-tight">Upscale Factor</label>
                  <span className="text-xs font-bold bg-[#007BFF]/20 text-[#84adff] px-2 py-0.5 rounded">4x</span>
                </div>
                <div className="grid grid-cols-3 bg-surface-container-highest rounded-md p-1">
                  <button className="py-1.5 rounded text-on-surface-variant text-xs font-bold hover:text-white transition-all">2x</button>
                  <button className="py-1.5 rounded bg-primary-fixed text-on-primary-fixed text-xs font-bold transition-all shadow-[0_2px_4px_rgba(0,0,0,0.2)]">4x</button>
                  <button className="py-1.5 rounded text-on-surface-variant text-xs font-bold hover:text-white transition-all">8x</button>
                </div>
              </div>
              {/* AI Model */}
              <div className="space-y-3">
                <label className="font-label font-bold text-sm text-[#adaaaa] uppercase tracking-tight">AI Model</label>
                <div className="flex flex-col gap-2">
                  <div className="p-3 bg-[#1a1a1a] rounded-xl border border-[#007BFF]/40 flex items-center gap-3 cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-[#007BFF] shadow-[0_0_8px_#007BFF]"></div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-white">Precision Pro v3</p>
                      <p className="text-[10px] text-[#adaaaa]">Best for landscapes &amp; textures</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#131313] rounded-xl border border-[#333333] flex items-center gap-3 cursor-pointer hover:bg-[#1a1a1a] transition-all">
                    <div className="w-2 h-2 rounded-full bg-[#333333]"></div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-[#adaaaa]">Face Enhance</p>
                      <p className="text-[10px] text-[#adaaaa]/60">Optimized for portraits</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Sliders */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-xs font-bold text-[#adaaaa]">Noise Reduction</label>
                    <span className="text-xs font-medium text-[#007BFF]">45%</span>
                  </div>
                  <input className="w-full" max="100" min="0" type="range" defaultValue="45" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-xs font-bold text-[#adaaaa]">Sharpening</label>
                    <span className="text-xs font-medium text-[#007BFF]">20%</span>
                  </div>
                  <input className="w-full" max="100" min="0" type="range" defaultValue="20" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-xs font-bold text-[#adaaaa]">Deblocking</label>
                    <span className="text-xs font-medium text-[#007BFF]">62%</span>
                  </div>
                  <input className="w-full" max="100" min="0" type="range" defaultValue="62" />
                </div>
              </div>
              {/* Toggles */}
              <div className="space-y-4 pt-4 border-t border-[#1a1a1a]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#adaaaa]">Fix Moiré Patterns</span>
                  <div className="w-9 h-5 bg-[#333333] rounded-full p-1 cursor-pointer">
                    <div className="w-3 h-3 bg-[#adaaaa] rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Color Restoration</span>
                  <div className="w-9 h-5 bg-[#007BFF]/30 rounded-full p-1 cursor-pointer flex justify-end">
                    <div className="w-3 h-3 bg-[#007BFF] rounded-full shadow-[0_0_8px_#007BFF]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto p-6 bg-[#1a1a1a]/50">
              <button className="w-full py-4 primary-gradient text-white rounded-md font-headline font-bold text-sm flex items-center justify-center gap-2 ambient-shadow active:scale-95 transition-all">
                <span className="material-symbols-outlined text-lg">bolt</span>
                Run Upscaler
              </button>
            </div>
          </aside>
        </section>
      </main>
      {/* Footer */}
      <footer className="w-full py-6 bg-[#0e0e0e] border-t border-[#1a1a1a] z-50">
        <div className="flex justify-between items-center px-8 max-w-[1920px] mx-auto">
          <span className="font-body text-[10px] uppercase tracking-widest text-[#adaaaa]/40">© 2024 Obsidian Lens AI</span>
          <div className="flex gap-8">
            <a className="font-body text-[10px] uppercase tracking-widest text-[#adaaaa]/40 hover:text-white transition-colors" href="#">Help Center</a>
            <a className="font-body text-[10px] uppercase tracking-widest text-[#adaaaa]/40 hover:text-white transition-colors" href="#">API</a>
            <a className="font-body text-[10px] uppercase tracking-widest text-[#adaaaa]/40 hover:text-white transition-colors" href="#">Terms</a>
            <a className="font-body text-[10px] uppercase tracking-widest text-[#adaaaa]/40 hover:text-white transition-colors" href="#">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
