
import React, { useState, useEffect } from 'react';
import { Shield, Phone, MapPin, X, Users, AlertCircle, MessageSquare, Bluetooth, Mic, Activity, Fingerprint, RefreshCcw } from 'lucide-react';
import { mockApi } from '../services/mockApi';
import { analyzeCrowdDensity } from '../services/geminiService';
import { SOSAlert, Location, CrowdDensity } from '../types';

interface LiveAlertProps {
  onResolve: () => void;
}

const LiveAlert: React.FC<LiveAlertProps> = ({ onResolve }) => {
  const [alert, setAlert] = useState<SOSAlert | null>(null);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [note, setNote] = useState('');
  const [simulatedCoords, setSimulatedCoords] = useState<{lat: number, lng: number}>({ lat: 40.7128, lng: -74.0060 });
  
  // Crowd Analysis States
  const [density, setDensity] = useState<CrowdDensity>('UNKNOWN');
  const [analysisNote, setAnalysisNote] = useState('Initializing sensors...');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const active = mockApi.getActiveAlert();
    if (active) {
      setAlert(active);
      runCrowdAnalysis();
    } else {
      window.location.hash = '/dashboard';
    }

    // Simulate moving location
    const interval = setInterval(() => {
      setSimulatedCoords(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
    }, 5000);

    // Run crowd analysis periodically
    const analysisInterval = setInterval(() => {
      runCrowdAnalysis();
    }, 15000);

    return () => {
      clearInterval(interval);
      clearInterval(analysisInterval);
    };
  }, []);

  const runCrowdAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate signal patterns
    const signals = {
      audioDesc: Math.random() > 0.5 ? "Quiet street with distant traffic" : "Loud chatter, multiple voices nearby",
      btDeviceCount: Math.floor(Math.random() * 12),
      motionIntensity: Math.random() > 0.5 ? "Running / Aggressive motion" : "Steady walking"
    };

    const result = await analyzeCrowdDensity(signals);
    setDensity(result.density as CrowdDensity);
    setAnalysisNote(result.reasoning);
    setIsAnalyzing(false);

    if (alert) {
      await mockApi.updateCrowdAnalysis(alert.id, {
        density: result.density as CrowdDensity,
        confidence: 0.85,
        signals: ['Bluetooth', 'Microphone', 'IMU'],
        lastUpdated: Date.now()
      });
    }
  };

  if (!alert) return null;

  const handleResolve = async () => {
    await mockApi.resolveAlert(alert.id, note);
    onResolve();
  };

  const handleCancel = async () => {
    await mockApi.cancelAlert(alert.id);
    onResolve();
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
    <div className="min-h-screen bg-rose-950/20 relative flex flex-col">
      {/* Top Banner */}
      <div className="bg-rose-600 p-4 flex items-center justify-between text-white animate-pulse">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-6 h-6" />
          <span className="font-black text-lg uppercase tracking-widest">SOS ACTIVE</span>
        </div>
        <div className="text-sm font-bold opacity-80">Contacts Notified & GPS Tracking</div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
        {/* Left: Map Visualization (Simulated) */}
        <div className="lg:col-span-3 glass-morphism rounded-3xl relative overflow-hidden bg-slate-900 border-2 border-rose-500/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="w-16 h-16 text-rose-500 mx-auto animate-bounce" />
              <div className="space-y-1">
                <p className="font-bold text-xl">Current Location Verified</p>
                <p className="text-slate-400 font-mono text-sm">{simulatedCoords.lat.toFixed(4)}, {simulatedCoords.lng.toFixed(4)}</p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 space-y-1">
            <p className="text-[10px] uppercase font-bold text-rose-400">Signal Strength</p>
            <div className="flex space-x-1">
              {[1,2,3,4].map(i => <div key={i} className="w-1 h-3 bg-rose-500 rounded-full" />)}
            </div>
          </div>
        </div>

        {/* Right: Status Sidebar */}
        <div className="space-y-4 flex flex-col">
          {/* Proximity Intelligence Card (New ML Feature) */}
          <div className="glass-morphism rounded-3xl p-6 border border-indigo-500/30 bg-indigo-500/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-indigo-400 flex items-center space-x-2">
                <Fingerprint size={18} />
                <span>Proximity Intelligence</span>
              </h3>
              <div className="flex space-x-1">
                <Bluetooth size={12} className={isAnalyzing ? 'animate-pulse text-indigo-400' : 'text-slate-600'} />
                <Mic size={12} className={isAnalyzing ? 'animate-pulse text-indigo-400' : 'text-slate-600'} />
                <Activity size={12} className={isAnalyzing ? 'animate-pulse text-indigo-400' : 'text-slate-600'} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-widest">Crowd Density</span>
                <span className={`text-xs font-black uppercase tracking-widest ${getDensityColor(density)}`}>
                  {density}
                </span>
              </div>
              
              {/* Density Bar */}
              <div className="flex space-x-1.5 h-1.5">
                <div className={`flex-1 rounded-full transition-all duration-1000 ${density === 'LOW' || density === 'MEDIUM' || density === 'HIGH' ? 'bg-rose-500' : 'bg-white/5'}`} />
                <div className={`flex-1 rounded-full transition-all duration-1000 ${density === 'MEDIUM' || density === 'HIGH' ? 'bg-amber-500' : 'bg-white/5'}`} />
                <div className={`flex-1 rounded-full transition-all duration-1000 ${density === 'HIGH' ? 'bg-emerald-500' : 'bg-white/5'}`} />
              </div>

              <p className="text-[11px] text-slate-300 italic leading-snug">
                "{analysisNote}"
              </p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[9px] text-slate-500 font-black uppercase">Privacy-Protected ML</span>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
              </div>
            </div>
          </div>

          <div className="glass-morphism rounded-3xl p-6 border border-rose-500/20 space-y-6 flex-1">
            <h3 className="font-bold text-rose-400 flex items-center space-x-2">
              <Users size={18} />
              <span>Contact Status</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-black">S</div>
                  <div>
                    <p className="text-sm font-bold">Sarah Mom</p>
                    <p className="text-[10px] text-emerald-400 uppercase">Alert Viewed</p>
                  </div>
                </div>
                <Phone className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => setShowResolveModal(true)}
              className="w-full py-4 bg-emerald-600 text-white rounded-3xl font-bold flex items-center justify-center space-x-2 shadow-xl hover:bg-emerald-700 transition-all"
            >
              <Shield size={20} />
              <span>I am Safe / Resolve SOS</span>
            </button>
            
            <button 
              onClick={() => setShowCancelModal(true)}
              className="w-full py-4 bg-white/5 text-rose-400 border border-rose-500/30 rounded-3xl font-bold flex items-center justify-center space-x-2 hover:bg-rose-500/10 transition-all"
            >
              <RefreshCcw size={18} />
              <span>Cancel SOS (Accidental)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Resolution Modal */}
      {showResolveModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="glass-morphism max-w-md w-full p-8 rounded-[2.5rem] border border-white/10 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Confirm Safety</h2>
              <p className="text-slate-400 text-sm">Please provide a brief note. Contacts will be notified that you are safe.</p>
            </div>
            
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-slate-200 focus:outline-none focus:border-rose-500 h-32"
              placeholder="e.g. I am home safe now, situation resolved..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="flex space-x-4">
              <button 
                onClick={() => setShowResolveModal(false)}
                className="flex-1 py-4 rounded-2xl font-bold text-slate-400 hover:bg-white/5 transition-all"
              >
                Back
              </button>
              <button 
                onClick={handleResolve}
                className="flex-1 py-4 bg-emerald-600 rounded-2xl font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
              >
                Confirm Safe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Modal (Accidental Trigger) */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="glass-morphism max-w-md w-full p-8 rounded-[2.5rem] border border-rose-500/20 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCcw className="text-rose-500 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-rose-100">Cancel Alert?</h2>
              <p className="text-slate-400 text-sm">Only use this if the SOS was triggered by mistake. Contacts will be informed it was an accidental trigger.</p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <button 
                onClick={handleCancel}
                className="w-full py-4 bg-rose-600 rounded-2xl font-bold text-white shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-all"
              >
                Yes, Cancel Alert
              </button>
              <button 
                onClick={() => setShowCancelModal(false)}
                className="w-full py-4 rounded-2xl font-bold text-slate-400 hover:bg-white/5 transition-all"
              >
                Go Back (SOS Stays Active)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveAlert;
