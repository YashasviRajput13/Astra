
import React, { useState, useEffect } from 'react';
import { Shield, Zap, MapPin, Smartphone, ChevronRight, AlertCircle, Info } from 'lucide-react';
import { getSafetyAdvice } from '../services/geminiService';
import { mockApi } from '../services/mockApi';
import { Device, SOSAlert } from '../types';

interface DashboardProps {
  onTriggerSOS: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onTriggerSOS }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [advice, setAdvice] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState(true);
  const [activeAlert, setActiveAlert] = useState<SOSAlert | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const devList = await mockApi.getDevices();
      setDevices(devList);
      setActiveAlert(mockApi.getActiveAlert());
      
      // Get AI safety tips based on generic context for dashboard
      const tip = await getSafetyAdvice("general urban evening commute");
      setAdvice(tip);
      setLoadingAdvice(false);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Welcome back, Safely.</h2>
          <p className="text-slate-400">Your ASTRA protection is active and monitoring.</p>
        </div>
        <div className="flex items-center space-x-3 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 text-sm font-medium">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span>System Fully Operational</span>
        </div>
      </div>

      {activeAlert && (
        <div className="bg-rose-500/20 border border-rose-500/40 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3 text-rose-400">
            <AlertCircle className="w-6 h-6 animate-bounce" />
            <div>
              <p className="font-bold">Active SOS Alert in Progress</p>
              <p className="text-sm">Tracking live location and notifying contacts.</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.hash = '/live-alert'}
            className="px-4 py-2 bg-rose-500 text-white rounded-xl text-sm font-bold"
          >
            View Live Status
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Action: SOS Button */}
        <div className="lg:col-span-2 space-y-8">
          <div className="relative glass-morphism rounded-[2.5rem] p-12 flex flex-col items-center text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 to-transparent" />
            
            <button
              onClick={onTriggerSOS}
              className="relative group w-48 h-48 md:w-64 md:h-64 rounded-full bg-rose-500 flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.4)] hover:shadow-[0_0_80px_rgba(239,68,68,0.6)] transition-all active:scale-95 z-10 animate-pulse-red"
            >
              <div className="flex flex-col items-center">
                <Shield className="w-16 h-16 md:w-20 md:h-20 text-white fill-white mb-2" />
                <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter">SOS</span>
              </div>
            </button>
            
            <div className="relative z-10 mt-8 space-y-2">
              <p className="text-xl font-bold">Tap and hold to trigger</p>
              <p className="text-slate-400 text-sm max-w-sm">
                Press for 3 seconds to notify all contacts. Inadvertent triggers can be cancelled within 10 seconds.
              </p>
            </div>
          </div>

          {/* AI Tips Card */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-[2rem] space-y-4">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold">
              <Info size={20} />
              <span>Smart Safety Advice</span>
            </div>
            {loadingAdvice ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-4 bg-white/5 rounded w-full" />
                <div className="h-4 bg-white/5 rounded w-3/4" />
              </div>
            ) : (
              <p className="text-slate-300 italic leading-relaxed">
                "{advice}"
              </p>
            )}
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Powered by ASTRA AI</div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          {/* Devices */}
          <div className="glass-morphism rounded-[2rem] p-6 space-y-6 border border-white/5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold flex items-center space-x-2 text-slate-200">
                <Smartphone size={18} />
                <span>Your Devices</span>
              </h3>
              <button 
                onClick={() => window.location.hash = '/settings'}
                className="text-xs text-rose-500 font-bold uppercase tracking-wider"
              >
                Add
              </button>
            </div>
            
            <div className="space-y-4">
              {devices.length > 0 ? devices.map(d => (
                <div key={d.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                      <Zap className={`w-5 h-5 ${d.status === 'CONNECTED' ? 'text-rose-400' : 'text-slate-600'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{d.name}</p>
                      <p className="text-[10px] text-slate-500">{d.status}</p>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-slate-400">{d.batteryLevel}%</div>
                </div>
              )) : (
                <div className="text-center py-6 text-slate-500 text-sm italic">
                  No devices paired. Connect your wearable for discrete alerts.
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass-morphism rounded-[2rem] p-6 space-y-4 border border-white/5">
             <h3 className="font-bold flex items-center space-x-2 text-slate-200">
                <MapPin size={18} />
                <span>Tracking History</span>
              </h3>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-black">04</div>
                <div className="text-xs text-slate-500 font-bold mb-1 uppercase">Safe Trips This Week</div>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-rose-500" />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
