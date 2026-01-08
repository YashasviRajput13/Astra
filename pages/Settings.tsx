
import React, { useState, useEffect } from 'react';
import { User, Shield, Bell, Smartphone, Lock, Smartphone as DeviceIcon, Info, ChevronRight, Zap } from 'lucide-react';
import { mockApi } from '../services/mockApi';
import { User as UserType } from '../types';

const Settings: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [toggles, setToggles] = useState({
    fallDetection: true,
    voiceTrigger: false,
    lowBatteryAlert: true,
    stealthMode: false
  });

  useEffect(() => {
    setUser(mockApi.getCurrentUser());
  }, []);

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!user) return null;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold">Preferences</h2>
        <p className="text-slate-400">Configure your security settings and account details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-morphism rounded-3xl p-8 border border-white/5 flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-[2.5rem] bg-rose-500/20 flex items-center justify-center text-rose-500">
              <User size={48} />
            </div>
            <div>
              <h3 className="text-xl font-bold uppercase tracking-tight">{user.name}</h3>
              <p className="text-slate-400 text-sm">{user.email}</p>
            </div>
            <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all">
              Edit Profile
            </button>
          </div>

          <div className="glass-morphism rounded-3xl p-6 border border-white/5 space-y-4">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
              <Lock size={16} />
              <span>Security PIN</span>
            </div>
            <p className="text-xs text-slate-500">Used to cancel emergency alerts or change core contacts.</p>
            <button className="text-xs text-rose-500 font-bold">RESET PIN</button>
          </div>
        </div>

        {/* Settings Groups */}
        <div className="md:col-span-2 space-y-6">
          {/* Smart Alerts */}
          <section className="space-y-4">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Emergency Automation</h4>
            <div className="glass-morphism rounded-[2.5rem] border border-white/5 overflow-hidden divide-y divide-white/5">
              {[
                { 
                  id: 'fallDetection', 
                  label: 'Fall Detection', 
                  desc: 'Automatically trigger SOS if a hard impact is detected.', 
                  icon: <Smartphone size={20} /> 
                },
                { 
                  id: 'voiceTrigger', 
                  label: 'Voice Activation', 
                  desc: 'Say "Astra, Help" to trigger alert while phone is locked.', 
                  icon: <Zap size={20} /> 
                },
                { 
                  id: 'lowBatteryAlert', 
                  label: 'Battery Guard', 
                  desc: 'Notify emergency contacts if your phone or wearable battery drops below 5%.', 
                  icon: <Bell size={20} /> 
                },
              ].map((item) => (
                <div key={item.id} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="text-rose-500">{item.icon}</div>
                    <div>
                      <p className="font-bold text-slate-200">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleToggle(item.id as keyof typeof toggles)}
                    className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${
                      toggles[item.id as keyof typeof toggles] ? 'bg-rose-600 justify-end' : 'bg-slate-800 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-lg" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Privacy & Protocol */}
          <section className="space-y-4">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Protocol Settings</h4>
            <div className="glass-morphism rounded-[2.5rem] border border-white/5 p-6 space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="space-y-1">
                  <p className="text-sm font-bold">Cancellation Delay</p>
                  <p className="text-[10px] text-slate-500 font-medium">Wait time before notifying contacts</p>
                </div>
                <select className="bg-transparent font-bold text-rose-500 text-sm focus:outline-none">
                  <option value="5">5 Seconds</option>
                  <option value="10">10 Seconds</option>
                  <option value="20">20 Seconds</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="space-y-1">
                  <p className="text-sm font-bold">Stealth Mode</p>
                  <p className="text-[10px] text-slate-500 font-medium">Screen stays dark during active alerts</p>
                </div>
                <button 
                  onClick={() => handleToggle('stealthMode')}
                  className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${
                    toggles.stealthMode ? 'bg-rose-600 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-lg" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
