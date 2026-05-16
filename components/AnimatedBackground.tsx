"use client";
import React from "react";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-slate-950">
      
      {/* 1. FORCED INLINE CSS ANIMATIONS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-orb-1 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(8vw, -8vh) scale(1.1); }
          66% { transform: translate(-4vw, 10vh) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float-orb-2 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-10vw, 8vh) scale(1.2); }
          66% { transform: translate(6vw, -6vh) scale(0.8); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-orb-1 {
          animation: float-orb-1 20s infinite ease-in-out;
        }
        .animate-orb-2 {
          animation: float-orb-2 25s infinite ease-in-out;
        }
      `}} />

      {/* 2. SUBTLE TECH GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* 3. ORB 1 (DEEP BLUE) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/30 blur-[120px] animate-orb-1"></div>

      {/* 4. ORB 2 (INDIGO) */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-600/30 blur-[120px] animate-orb-2"></div>
      
    </div>
  );
}
