import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronRight, Zap, WifiOff, TrendingUp, ShieldCheck } from 'lucide-react';

/* --- GLOBAL STYLES & ANIMATIONS ---
  Add these to your global CSS or Tailwind config if using a build step.
  For this single file, we inject them via a style tag.
*/
const GlobalStyles = () => (
  <style>{`
    @keyframes blink {
      0%, 90%, 100% { opacity: 1; transform: scaleY(1); }
      95% { opacity: 0.1; transform: scaleY(0.1); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .robot-eye { animation: blink 4s infinite; transform-origin: center; }
    .robot-antenna { animation: bounce 2s infinite ease-in-out; }
    .robot-float { animation: float 6s infinite ease-in-out; }
    .glow-text { text-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
    .glow-box { box-shadow: 0 0 30px rgba(59, 130, 246, 0.15); }
    .bg-grid {
      background-size: 40px 40px;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
      -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
    }
    body { background-color: #000000; color: #ffffff; font-family: 'Inter', sans-serif; overflow-x: hidden; }
  `}</style>
);

/* --- ROBOT MASCOT COMPONENT ---
  Recreated from React Native SVG to Web SVG 
*/
const RobotMascot = ({ width = 140, height = 160 }) => {
  return (
    <svg width={width} height={height} viewBox="0 -20 140 180" className="robot-float drop-shadow-2xl">
      {/* Antenna Group */}
      <g className="robot-antenna">
        <line x1="70" y1="8" x2="70" y2="22" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
        <circle cx="70" cy="5" r="5" fill="#3B82F6" />
      </g>

      {/* Head */}
      <rect x="30" y="22" width="80" height="75" rx="25" fill="#3B82F6" />

      {/* Eyes Group */}
      <g className="robot-eye">
        {/* White Sclera */}
        <circle cx="52" cy="55" r="13" fill="white" />
        <circle cx="88" cy="55" r="13" fill="white" />
        {/* Dark Pupils */}
        <circle cx="52" cy="55" r="7" fill="#1E293B" />
        <circle cx="88" cy="55" r="7" fill="#1E293B" />
        {/* Shine */}
        <circle cx="54" cy="52" r="3" fill="white" />
        <circle cx="90" cy="52" r="3" fill="white" />
      </g>

      {/* Smile */}
      <path
        d="M 48 75 Q 70 88 92 75"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Body */}
      <rect x="45" y="97" width="50" height="38" rx="18" fill="#3B82F6" />

      {/* Arms */}
      <g>
        <rect x="25" y="100" width="12" height="28" rx="6" fill="#60A5FA" />
        <circle cx="31" cy="132" r="7" fill="#60A5FA" />
        
        <rect x="103" y="100" width="12" height="28" rx="6" fill="#60A5FA" />
        <circle cx="109" cy="132" r="7" fill="#60A5FA" />
      </g>

      {/* Legs */}
      <g>
        <rect x="52" y="135" width="14" height="18" rx="7" fill="#60A5FA" />
        <ellipse cx="59" cy="153" rx="9" ry="5" fill="#3B82F6" />
        
        <rect x="74" y="135" width="14" height="18" rx="7" fill="#60A5FA" />
        <ellipse cx="81" cy="153" rx="9" ry="5" fill="#3B82F6" />
      </g>
    </svg>
  );
};

/* --- MAIN LANDING PAGE --- 
*/
const AtlasLanding = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleJoinWaitlist = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      const response = await fetch("https://formspree.io/f/mrbnjrez", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        alert("Something went wrong. Please try again.");
        setStatus('idle');
      }
    } catch (error) {
      alert("Error submitting form. Please check your connection.");
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 overflow-hidden selection:bg-blue-500 selection:text-white">
      <GlobalStyles />
      
      {/* BACKGROUND ACCENTS */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      {/* HUD HEADER */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 md:top-6 md:left-6 md:translate-x-0 z-50 backdrop-blur-md bg-white/5 border border-white/10 rounded-full pl-2 pr-6 py-2 flex items-center gap-3 shadow-2xl hover:border-blue-500/30 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-black text-sm">A</div>
        <span className="text-xs font-bold tracking-[0.2em] text-slate-300">ATLAS</span>
        <div className="h-4 w-[1px] bg-white/10 mx-1"></div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-[10px] font-mono text-blue-400">ONLINE</span>
        </div>
      </motion.div>

      {/* HERO SECTION */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 text-center max-w-5xl mx-auto">
        
        {/* Robot Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-blue-500 blur-[60px] opacity-20 rounded-full" />
          <RobotMascot width={200} height={230} />
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          The <span className="text-blue-500 glow-text">AI Coach</span> That Tells You <br className="hidden md:block" /> Exactly How To Progress.
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          Guaranteed to get stronger. Automated progressive overload, intelligent personalization, and adaptive feedback.
        </motion.p>

        {/* Waitlist Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full max-w-md"
        >
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-200 font-medium"
            >
              ✅ You're on the list! We'll be in touch soon.
            </motion.div>
          ) : (
            <form onSubmit={handleJoinWaitlist} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-6 py-4 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-blue-600 rounded-2xl font-bold text-white shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] hover:bg-blue-500 hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.7)] disabled:opacity-70 disabled:cursor-not-allowed transition-all whitespace-nowrap"
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          )}
        </motion.div>
        
        <p className="mt-6 text-slate-500 text-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
          Be the first to train with Atlas. <span className="text-slate-300 font-medium">100% Free during Beta.</span>
        </p>
      </section>

      {/* THE PROBLEM SECTION */}
      <section className="relative z-10 py-24 px-4 bg-slate-900/30 border-y border-slate-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-slate-400"
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-red-500">✕</span> The Guesser
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2.5" />
                "I think I'll try 185lbs today?"
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2.5" />
                Stuck at the same bench press for 6 months.
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2.5" />
                Uses a messy notes app with zero analytics.
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-500/30 glow-box relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-4 opacity-20">
               <Zap className="w-24 h-24 text-blue-500" />
             </div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-green-400">✓</span> The Atlas Strategy
            </h3>
            <ul className="space-y-4 text-slate-200">
              <li className="flex gap-3">
                <ChevronRight className="w-5 h-5 text-blue-500 mt-0.5" />
                <strong>Automated Math:</strong> "Lift 185lbs x 8 reps today."
              </li>
              <li className="flex gap-3">
                <ChevronRight className="w-5 h-5 text-blue-500 mt-0.5" />
                <strong>Plateau Breaker:</strong> AI detects stalls instantly.
              </li>
              <li className="flex gap-3">
                <ChevronRight className="w-5 h-5 text-blue-500 mt-0.5" />
                <strong>Elite Analytics:</strong> Visual proof of your strength curve.
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for the <span className="text-blue-500">Serious Lifters</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Proven progressive overload features to optimize your strength and muscle growth.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <WifiOff className="w-8 h-8 text-blue-400" />,
              title: "100% Offline Mode",
              desc: "Built with local-first architecture. Your data stays on your device and works perfectly in basement gyms with zero signal."
            },
            {
              icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
              title: "Plateau Detection",
              desc: "Atlas analyzes your volume and intensity trends to flag stalls when they happen, suggesting specific protocol changes."
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
              title: "Smart Progressions",
              desc: "Stop guessing. The AI prescribes the exact weight for every set based on your history and daily readiness."
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-colors group"
            >
              <div className="mb-6 p-4 bg-blue-500/10 rounded-xl w-fit group-hover:bg-blue-500/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="relative z-10 py-24 px-4 bg-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase italic tracking-tighter">"Iron Sharpens Iron"</h2>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
            <div className="flex justify-center mb-6">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              ))}
            </div>
            <p className="text-xl md:text-2xl font-medium mb-8 italic">
              "I spent weeks obsessing over Atlas's progressive overload algorithm to mathematically enhance muscle growth and remove guesswork from your lifts. If you want to grow, this app will push you farther than you could go alone."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                 {/* Placeholder Avatar */}
                 <div className="w-full h-full bg-gradient-to-tr from-slate-400 to-slate-300"></div>
              </div>
              <div className="text-left">
                <div className="font-bold">Kyle Mayotte</div>
                <div className="text-blue-100 text-sm">D1 Athlete • Verified User</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-black py-12 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-xs font-bold text-black">A</div>
            <span className="font-bold tracking-tight">ATLAS</span>
          </div>
          
          <div className="flex gap-8 text-sm text-slate-500">
            <a 
              href="https://docs.google.com/document/d/e/2PACX-1vT4YNVm_A2A96eesL26L4YfWzXzCJSZxNSW6n7kIVJwPeNzLqP8CSp9F4uEigNb-DZPdIZinCJXiYK0/pub" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </a>
          </div>

          <div className="text-slate-600 text-sm">
            © 2025 Atlas Fitness AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AtlasLanding;