import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Download, ChevronRight, Zap, ScanLine, BrainCircuit, Activity, ShieldCheck, Smartphone, Check, AlertCircle } from 'lucide-react';

/* --- GLOBAL STYLES & ANIMATIONS --- */
const GlobalStyles = () => (
  <style>{`
    @keyframes blink {
      0%, 90%, 100% { opacity: 1; transform: scaleY(1); }
      95% { opacity: 0.1; transform: scaleY(0.1); }
    }
    @keyframes scan {
      0% { top: 0%; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .robot-eye { animation: blink 4s infinite; transform-origin: center; }
    .robot-float { animation: float 6s infinite ease-in-out; }
    .scanner-line { animation: scan 2s infinite linear; }
    .glow-text { text-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
    .glow-box { box-shadow: 0 0 40px rgba(59, 130, 246, 0.1); }
    .bg-grid {
      background-size: 50px 50px;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
      -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
    }
    body { background-color: #050505; color: #ffffff; font-family: 'Inter', sans-serif; overflow-x: hidden; }
    
    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #000; }
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #555; }
  `}</style>
);

/* --- APP STORE BUTTON --- */
const AppStoreButton = () => (
  <a 
    href="https://apps.apple.com/us/app/atlas-macro-scanner-workout/id6755451627" 
    target="_blank" 
    rel="noopener noreferrer"
    className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)] active:scale-95"
  >
    <svg className="w-8 h-8" viewBox="0 0 384 512" fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
    </svg>
    <div className="text-left leading-tight">
      <div className="text-xs font-medium text-black/60 uppercase tracking-wider">Download on the</div>
      <div className="text-xl font-black tracking-tight">App Store</div>
    </div>
    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
      <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:animate-[shine_1.5s_infinite]" />
    </div>
  </a>
);

/* --- ROBOT MASCOT (Scanner Mode) --- */
const RobotScanner = ({ width = 140, height = 160 }) => {
  return (
    <div className="relative">
      <svg width={width} height={height} viewBox="0 -20 140 180" className="robot-float drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]">
        {/* Antenna */}
        <g className="robot-antenna">
          <line x1="70" y1="8" x2="70" y2="22" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
          <circle cx="70" cy="5" r="5" fill="#3B82F6" className="animate-pulse" />
        </g>

        {/* Head */}
        <rect x="30" y="22" width="80" height="75" rx="25" fill="#0F172A" stroke="#3B82F6" strokeWidth="2" />
        <rect x="35" y="27" width="70" height="65" rx="20" fill="#1E293B" opacity="0.5" />
        
        {/* Eyes (Scanning) */}
        <g className="robot-eye">
          <circle cx="52" cy="55" r="10" fill="#000" stroke="#3B82F6" strokeWidth="2" />
          <circle cx="88" cy="55" r="10" fill="#000" stroke="#3B82F6" strokeWidth="2" />
          <circle cx="52" cy="55" r="4" fill="#60A5FA" />
          <circle cx="88" cy="55" r="4" fill="#60A5FA" />
        </g>

        {/* Smile/Scanner Beam */}
        <path d="M 48 75 Q 70 88 92 75" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
        
        {/* Body */}
        <rect x="45" y="97" width="50" height="38" rx="18" fill="#0F172A" stroke="#3B82F6" strokeWidth="2" />

        {/* Arms */}
        <g>
          <rect x="25" y="100" width="12" height="28" rx="6" fill="#1E293B" stroke="#60A5FA" strokeWidth="1" />
          <circle cx="31" cy="132" r="7" fill="#60A5FA" />
          
          <rect x="103" y="100" width="12" height="28" rx="6" fill="#1E293B" stroke="#60A5FA" strokeWidth="1" />
          <circle cx="109" cy="132" r="7" fill="#60A5FA" />
        </g>

        {/* Legs */}
        <g>
          <rect x="52" y="135" width="14" height="18" rx="7" fill="#1E293B" stroke="#60A5FA" strokeWidth="1" />
          <ellipse cx="59" cy="153" rx="9" ry="5" fill="#3B82F6" />
          
          <rect x="74" y="135" width="14" height="18" rx="7" fill="#1E293B" stroke="#60A5FA" strokeWidth="1" />
          <ellipse cx="81" cy="153" rx="9" ry="5" fill="#3B82F6" />
        </g>
      </svg>
      {/* Scanning Laser Overlay */}
      <div className="absolute top-[20%] left-[-10%] w-[120%] h-[2px] bg-red-500 shadow-[0_0_10px_#ef4444] scanner-line opacity-50 pointer-events-none" />
    </div>
  );
};

/* --- SCANNER SCREEN COMPONENT --- */
const ScannerScreen = () => {
  const [state, setState] = useState('scanning'); // scanning, analyzing, result
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (state === 'scanning') {
      const timeout = setTimeout(() => setState('analyzing'), 3000);
      return () => clearTimeout(timeout);
    }
    if (state === 'analyzing') {
      const timeout = setTimeout(() => setState('result'), 1500);
      return () => clearTimeout(timeout);
    }
    if (state === 'result') {
      interval = setInterval(() => {
        setProgress(prev => (prev < 94 ? prev + 2 : 94));
      }, 20);
      
      // Reset cycle after some time to loop the demo
      const resetTimeout = setTimeout(() => {
        setState('scanning');
        setProgress(0);
      }, 8000);
      return () => {
        clearInterval(interval);
        clearTimeout(resetTimeout);
      };
    }
  }, [state]);

  return (
    <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden aspect-[9/19] relative border border-slate-800 shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
      
      {/* --- CONTENT AREA --- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          
          {/* STATE: SCANNING */}
          {state === 'scanning' && (
            <motion.div 
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-64 h-64 border-2 border-white/30 rounded-xl overflow-hidden"
            >
              {/* Corner Markers */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500 -mt-1 -ml-1" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500 -mt-1 -mr-1" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500 -mb-1 -ml-1" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500 -mb-1 -mr-1" />
              
              {/* Fake Barcode */}
              <div className="absolute inset-10 flex flex-col justify-center opacity-40">
                <div className="h-full w-full flex justify-between items-center gap-[2px]">
                   {[...Array(20)].map((_,i) => (
                     <div key={i} className="bg-white h-32" style={{width: Math.random() * 8 + 2}} />
                   ))}
                </div>
                <div className="text-center text-xs font-mono mt-2 tracking-[0.5em]">091837452</div>
              </div>

              {/* Scanning Laser */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500 shadow-[0_0_15px_#ef4444] scanner-line" />
              
              <div className="absolute bottom-4 w-full text-center">
                 <span className="bg-black/50 px-3 py-1 rounded-full text-xs font-mono text-white/70 backdrop-blur-md">SCANNING BARCODE...</span>
              </div>
            </motion.div>
          )}

          {/* STATE: ANALYZING */}
          {state === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative w-24 h-24">
                 <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping" />
                 <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin" />
                 <BrainCircuit className="absolute inset-0 m-auto text-blue-400 w-10 h-10" />
              </div>
              <p className="text-blue-400 font-mono text-sm animate-pulse">ANALYZING AMINO PROFILE...</p>
            </motion.div>
          )}

          {/* STATE: RESULT */}
          {state === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full h-full flex flex-col justify-center items-center"
            >
               {/* Ring Score */}
               <div className="relative w-48 h-48 mb-8">
                  {/* Background Circle */}
                  <svg className="w-full h-full rotate-[-90deg]">
                    <circle cx="50%" cy="50%" r="90" fill="none" stroke="#1e293b" strokeWidth="12" />
                    <circle 
                      cx="50%" 
                      cy="50%" 
                      r="90" 
                      fill="none" 
                      stroke="#22c55e" 
                      strokeWidth="12" 
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 90}`} 
                      strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                      className="transition-all duration-300 ease-out drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-6xl font-black text-white">{progress}</span>
                    <span className="text-xs uppercase tracking-widest text-slate-400 mt-1">Atlas Score</span>
                  </div>
               </div>

               {/* Tags */}
               <div className="flex flex-col gap-3 w-full px-4">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between bg-slate-800/50 p-3 rounded-xl border border-green-500/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500/20 p-2 rounded-lg text-green-400"><Zap size={18} /></div>
                      <div>
                        <div className="font-bold text-white text-sm">Elite Fuel</div>
                        <div className="text-[10px] text-slate-400">High Anabolic Potential</div>
                      </div>
                    </div>
                    <Check className="text-green-500 w-5 h-5" />
                  </motion.div>

                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-between bg-slate-800/50 p-3 rounded-xl border border-blue-500/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400"><Activity size={18} /></div>
                      <div>
                        <div className="font-bold text-white text-sm">DIAAS: 98%</div>
                        <div className="text-[10px] text-slate-400">Bioavailability Score</div>
                      </div>
                    </div>
                  </motion.div>
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Bottom Sheet Hint (Always visible but dimmed in result) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
         <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-2" />
      </div>
    </div>
  );
};

/* --- MAIN LANDING PAGE --- */
const AtlasLanding = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen bg-black text-slate-100 selection:bg-blue-500 selection:text-white">
      <GlobalStyles />
      
      {/* HEADER */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <span className="text-black font-black text-xl">A</span>
          </div>
          <span className="font-bold tracking-[0.2em] text-white hidden md:block">ATLAS</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-mono text-green-400">V2.0 LIVE</span>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-12 relative z-10"
        >
          <RobotScanner width={180} height={200} />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
        >
          THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">ANABOLIC</span> <br />
          TRUTH.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-2xl text-slate-400 max-w-2xl mb-12 leading-relaxed"
        >
          The world's first <span className="text-white font-semibold">AI Scanner</span> for protein quality & bioavailability.
          <br className="hidden md:block" /> Plus, an automated hypertrophy coach that adapts to you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <AppStoreButton />
          <p className="mt-6 text-slate-500 text-sm">
            Available now for iOS
          </p>
        </motion.div>
      </section>

      {/* SCANNER DEMO SECTION */}
      <section className="py-32 px-6 relative z-10 border-t border-slate-900 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-mono">
                <ScanLine size={14} />
                <span>ATLAS VISION™</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold leading-none">
                Don't Just Count Calories. <br />
                <span className="text-blue-500">Scan Quality.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Most "fitness foods" are full of junk. Atlas uses a proprietary 
                <strong className="text-white"> Anabolic Engine</strong> to analyze food for:
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Bioavailability (DIAAS)", desc: "See how much protein your body actually absorbs." },
                  { title: "Digestive Utility", desc: "Flag the 'Dirty 7' ingredients that cause bloating." },
                  { title: "Anabolic Score", desc: "A simple 0-100 rating for muscle-building potential." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="mt-1 w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{item.title}</h3>
                      <p className="text-slate-500">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* PHONE VISUALIZATION WITH ANIMATION */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
              <motion.div 
                initial={{ rotate: 10, y: 100, opacity: 0 }}
                whileInView={{ rotate: 0, y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, type: "spring" }}
                className="relative bg-black border border-slate-800 rounded-[3rem] p-4 shadow-2xl max-w-sm mx-auto"
              >
                <ScannerScreen />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* TRAINING SECTION */}
      <section className="py-32 px-6 bg-white text-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">THE COACH.</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Training without a plan is just guessing. Atlas builds a dynamic, 
              progressive overload program tailored to your recovery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BrainCircuit className="w-8 h-8" />,
                title: "Adaptive Logic",
                desc: "Stalled on bench? Atlas detects the plateau and rotates your rep ranges automatically."
              },
              {
                icon: <Activity className="w-8 h-8" />,
                title: "Readiness Check",
                desc: "Daily surveys adjust volume based on your sleep, stress, and soreness levels."
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Perfect Form",
                desc: "Detailed cues and tempo guides ensure every rep stimulates maximum hypertrophy."
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-20 px-6 border-t border-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to evolve?</h2>
          <div className="flex justify-center mb-12">
            <AppStoreButton />
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-600 text-sm pt-12 border-t border-slate-900">
            <p>© 2026 Atlas Fitness AI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AtlasLanding;