
import React, { useState, useEffect } from 'react';
import { Radar, Shield, Mic, Bluetooth, Activity, Fingerprint, Info, MapPin } from 'lucide-react';
import { analyzeCrowdDensity } from '../services/geminiService';
import { CrowdDensity } from '../types';

const CrowdMonitor: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [density, setDensity] = useState<CrowdDensity>('UNKNOWN');
  const [reasoning, setReasoning] = useState('Stand still while we analyze ambient signals.');
  const [signals, setSignals] = useState({ bt: 0, audio: 0, movement: 'Low' });

  const startScan = async () => {
    setIsScanning(true);
    setDensity('UNKNOWN');
    setReasoning('Scanning environment...');

    // Simulate sensor warmup
    await new Promise(r => setTimeout(r, 2000));
    
    const mockSignals = {
      audioDesc: Math.random() > 0.6 ? "Echoey footsteps, quiet hall" : "Crowded station, multiple chatter sources",
      btDeviceCount: Math.floor(Math.random() * 20),
      motionIntensity: "Stationary scanning"
    };

    setSignals({
      bt: mockSignals.btDeviceCount,
      audio: Math.random() * 100,
      movement: 'Steady'
    });

    const result = await analyzeCrowdDensity(mockSignals);
    setDensity(result.density as CrowdDensity);
    setReasoning(result.reasoning);
    setIsScanning(false);
  };

  const getDensityColor = (d: CrowdDensity) => {
    switch (d) {
      case 'LOW': return 'text-rose-400';
      case 'MEDIUM': return 'text-amber-400';
      case 'HIGH': return 'text-emerald-400';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto flex flex-col items-center min-h-[calc(100vh-100px)]">
      <div className="text-center space-y-2 w-full">
        <h2 className="text-3xl font-black tracking-tight flex items-center justify-center space-x-3">
          <Radar className="text-rose-500" />
          <span>Crowd Intelligence</span>
        </h2>
        <p className="text-slate-400">Proactively scan your surroundings for safety context.</p>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center space-y-12">
        {/* Radar Animation */}
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <div className="absolute inset-0 rounded-full border border-rose-500/20" />
          <div className="absolute inset-4 rounded-full border border-rose-500/10" />
          <div className="absolute inset-8 rounded-full border border-rose-500/5" />
          
          {/* Radar Sweep */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/0 via-rose-500/10 to-transparent ${isScanning ? 'animate-radar' : 'hidden'}`} />
          
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="relative">
                <Shield className={`w-16 h-16 ${isScanning ? 'text-rose-500 animate-pulse' : 'text-slate-700'}`} />
                {density !== 'UNKNOWN' && (
                   <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center border-2 border-slate-950">
                      <span className="text-[10px] font-black">!</span>
                   </div>
                )}
             </div>
          </div>

          {/* Floating Dots representing detected signals */}
          {signals.bt > 0 && Array.from({ length: Math.min(signals.bt, 8) }).map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Results Card */}
        <div className="w-full max-w-md glass-morphism rounded-[3rem] p-8 border border-white/5 space-y-6">
           <div className="flex items-center justify-between">
              <div className="space-y-1">
                 <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Environment Status</p>
                 <p className={`text-2xl font-black uppercase ${getDensityColor(density)}`}>{density}</p>
              </div>
              <button 
                onClick={startScan}
                disabled={isScanning}
                className="px-6 py-3 bg-rose-600 rounded-2xl font-bold text-sm hover:bg-rose-700 transition-all disabled:opacity-50"
              >
                {isScanning ? 'Scanning...' : 'Scan Now'}
              </button>
           </div>

           <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "{reasoning}"
              </p>
           </div>

           <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-3 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
                 <Bluetooth size={16} className="text-indigo-400 mb-1" />
                 <span className="text-xs font-bold">{signals.bt} Devices</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-rose-500/5 rounded-2xl border border-rose-500/10">
                 <Activity size={16} className="text-rose-400 mb-1" />
                 <span className="text-xs font-bold">{signals.movement}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                 <Mic size={16} className="text-emerald-400 mb-1" />
                 <span className="text-xs font-bold">Active Sensors</span>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-md w-full flex items-center space-x-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-200 text-xs">
         <Info size={18} />
         <p>Proximity Intelligence uses Bluetooth and ambient audio textures to estimate local crowd density. No individual data is identified or stored.</p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes radar {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-radar {
          animation: radar 4s linear infinite;
        }
      `}} />
    </div>
  );
};

export default CrowdMonitor;
