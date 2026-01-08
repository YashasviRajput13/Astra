
import React from 'react';
import { ArrowRight, Zap, Users, MapPin, Smartphone, Star, Heart, Trophy, Flag, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { MISSION_STATISTIC, FEATURES, APP_NAME } from '../constants';

interface LandingProps {
  onStart: () => void;
}

const LOGO_URL = "https://media.istockphoto.com/id/1360805952/vector/portrait-of-a-strong-woman-in-half-turn-avatar.jpg?s=612x612&w=0&k=20&c=PJCBU-7SFqnwfFI-NQUcHqRcxvcCayB1U8lD1C9FROU=";
const FEATURES_BG = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop";

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-slate-950 text-white selection:bg-rose-500/30">
      
      {/* 
          SCENE 1: THE HERO BACKGROUND 
          Restored Nature Silhouette representing the peak of independence and safety.
      */}
      <div className="fixed inset-0 z-0">
        {/* Deep base layer */}
        <div className="absolute inset-0 bg-[#060613]" />
        
        {/* The Sunset/Dawn Glow - The Colors of Independence */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/90 via-[#1a0a2a]/60 to-rose-900/40" />

        {/* 
           Main Hero Image - Restored Nature/Mountain Silhouette 
           Vividly visible representing the 'ASTRA' (starlight over the mountains) theme.
        */}
        <div 
          className="absolute inset-0 opacity-70 bg-no-repeat bg-center transition-all duration-1000 scale-100"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop')`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center 80%',
            maskImage: 'linear-gradient(to top, black 50%, transparent 95%), linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 95%), linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        />

        {/* Dynamic Light Accents */}
        <div className="absolute top-[15%] left-[10%] w-[35%] h-[35%] bg-rose-600/15 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[25%] w-[45%] h-[45%] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center py-8 md:py-12">
          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="relative">
              {/* Background Light Effect */}
              <div className="absolute inset-0 bg-rose-500/60 blur-2xl rounded-full scale-110 animate-pulse -z-10 group-hover:bg-rose-400/80 transition-colors" />
              
              <div className="w-16 h-16 rounded-[2rem] overflow-hidden border-2 border-rose-500/50 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(244,63,94,0.4)] relative z-10 bg-slate-900">
                <img 
                  src={LOGO_URL} 
                  alt="ASTRA Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="text-4xl font-black tracking-tighter uppercase italic">{APP_NAME}</span>
          </div>
          <button 
            onClick={onStart}
            className="px-8 py-3 bg-white/5 hover:bg-white/15 backdrop-blur-2xl border border-white/10 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            Sign In
          </button>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-black uppercase tracking-[0.4em] mb-12 animate-in fade-in slide-in-from-top-6 duration-1000 backdrop-blur-sm">
            <Trophy size={16} className="text-rose-400" />
            <span>Independence Through Safety</span>
          </div>

          <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-12 drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]">
            OWN YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-indigo-300 bg-[length:200%_auto] animate-gradient-shift">FREEDOM.</span>
          </h1>

          <p className="text-xl md:text-3xl text-slate-100 max-w-4xl font-semibold leading-tight opacity-95 mb-14 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
            Technology built for the bold. <br className="hidden md:block" />
            ASTRA ensures your independence is never compromised by the shadows.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg mb-20">
            <button 
              onClick={onStart}
              className="group flex-1 py-7 bg-white text-slate-950 rounded-[2.5rem] font-black text-2xl flex items-center justify-center space-x-4 shadow-[0_35px_70px_-15px_rgba(255,255,255,0.4)] hover:bg-rose-50 hover:scale-[1.04] active:scale-95 transition-all duration-300"
            >
              <span>CLAIM YOUR PROTECTION</span>
              <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </section>

        {/* 
            SCENE: FEATURES / CORE VALUES WITH BACKGROUND IMAGE
        */}
        <section className="relative py-32 px-6 overflow-hidden">
          {/* Section Background Image */}
          <div className="absolute inset-0 -z-10">
            <div 
              className="w-full h-full bg-cover bg-center opacity-40 grayscale-[50%] contrast-125"
              style={{ backgroundImage: `url('${FEATURES_BG}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/40 to-slate-950" />
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 w-full">
              {[
                { 
                  icon: <Compass className="text-orange-400" />, 
                  title: "Live Fearlessly", 
                  desc: "Walk any path, day or night. ASTRA provides the invisible safety net you deserve.",
                },
                { 
                  icon: <Heart className="text-rose-400" />, 
                  title: "Supportive Network", 
                  desc: "A collective force of women watching over each other through shared real-time alerts.",
                },
                { 
                  icon: <ShieldCheck className="text-indigo-400" />, 
                  title: "Instant Response", 
                  desc: "When seconds matter, ASTRA bridges the gap between fear and help instantly.",
                }
              ].map((item, i) => (
                <div key={i} className="group relative glass-morphism p-10 rounded-[3.5rem] border border-white/10 flex flex-col items-center text-center space-y-6 hover:border-white/30 transition-all duration-500 hover:-translate-y-3 bg-white/[0.03] backdrop-blur-[60px]">
                  <div className="relative">
                    {/* Background light for the icon */}
                    <div className="absolute inset-0 bg-white/5 blur-xl rounded-full scale-150 -z-10 group-hover:bg-white/10 transition-all" />
                    <div className="w-20 h-20 rounded-[1.8rem] bg-slate-900/60 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">{item.title}</h3>
                  <p className="text-base text-slate-100 leading-relaxed font-medium opacity-80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 
            SCENE 2: SOLIDARITY SECTION
            Focus on supportive connection (Maintains the dialogue aesthetic).
        */}
        <section className="py-40 bg-slate-900/80 backdrop-blur-3xl border-y border-white/10 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1 space-y-10">
                <div className="inline-block p-4 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-black tracking-widest text-xs uppercase">
                  Our Manifest
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                  STRONGER <br />
                  <span className="text-rose-500">TOGETHER</span> <br />
                  THAN EVER.
                </h2>
                <p className="text-slate-200 text-xl leading-relaxed font-medium opacity-90">
                  {MISSION_STATISTIC} Safety isn't a solo mission. It's a supportive dialogue between you and your trusted circle, powered by ASTRA's instant connectivity.
                </p>
                <div className="flex flex-wrap gap-5">
                  {["Crisis Support", "GPS Tracking", "Voice Triggers", "Wearable Stealth"].map(tag => (
                    <span key={tag} className="px-5 py-2.5 bg-white/5 rounded-2xl border border-white/10 text-xs font-black text-slate-400 uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 relative w-full">
                <div className="absolute inset-0 bg-rose-600/30 blur-[120px] rounded-full animate-pulse" />
                <div className="relative glass-morphism p-6 rounded-[4rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] group overflow-hidden">
                  <img 
                    src="https://media.gettyimages.com/id/2148975617/photo/woman-jumping-high-after-successful-job-interview.jpg?s=612x612&w=0&k=20&c=puWecKm9APpx7QYJmjHEySQVZM38wRDEQQvSZaCeL30=" 
                    alt="Supportive Connection" 
                    className="rounded-[3.5rem] group-hover:scale-105 transition-all duration-1000 object-cover aspect-[4/5] md:aspect-video lg:aspect-square"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-12 left-12 right-12 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-rose-400 font-black text-sm uppercase tracking-[0.3em]">Supportive Dialogue</p>
                      <p className="text-4xl font-black text-white">SOLIDARITY</p>
                    </div>
                    <div className="p-5 bg-rose-600 rounded-3xl shadow-2xl animate-bounce">
                      <Users size={32} className="text-white fill-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-48 px-6 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[200px] rounded-full pointer-events-none" />
          
          <div className="max-w-4xl mx-auto space-y-14 relative z-10">
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto animate-float">
               <Star className="w-10 h-10 text-rose-500 fill-rose-500" />
            </div>
            <h2 className="text-6xl md:text-[7rem] font-black leading-[0.85] tracking-tighter">
              LIVE WITHOUT <br /> LIMITS.
            </h2>
            <p className="text-slate-400 text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
              Empower your independence. Join the ASTRA community today.
            </p>
            <button 
              onClick={onStart}
              className="px-20 py-7 bg-gradient-to-br from-rose-600 to-indigo-700 rounded-[3rem] font-black text-3xl shadow-[0_40px_80px_rgba(225,29,72,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-4 mx-auto"
            >
              <span>START NOW</span>
              <ArrowRight size={32} />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 text-center text-slate-600 text-xs font-bold uppercase tracking-[0.5em]">
          &copy; {new Date().getFullYear()} {APP_NAME} - FOR HER INDEPENDENCE.
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          animation: gradient-shift 10s ease infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 15s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }
      `}} />
    </div>
  );
};

export default Landing;
