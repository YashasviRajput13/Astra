
import React, { useState } from 'react';
import { Smartphone, Shield, CheckCircle2, ArrowRight, Bluetooth } from 'lucide-react';
import { mockApi } from '../services/mockApi';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [pairing, setPairing] = useState(false);
  const [paired, setPaired] = useState(false);

  const handlePair = async () => {
    setPairing(true);
    await mockApi.pairDevice('Astra Core Ring', 'SN-2024-88A');
    setPairing(false);
    setPaired(true);
    setTimeout(() => setStep(2), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full glass-morphism p-10 rounded-[3rem] border border-white/10 space-y-12 text-center">
        {/* Progress Bar */}
        <div className="flex justify-center space-x-2">
          {[1,2,3].map(i => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${step >= i ? 'w-8 bg-rose-500' : 'w-4 bg-white/10'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="w-24 h-24 bg-rose-500/10 rounded-[2rem] flex items-center justify-center mx-auto">
              <Bluetooth className={`w-12 h-12 ${pairing ? 'text-rose-400 animate-pulse' : 'text-rose-500'}`} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Pair Device</h2>
              <p className="text-slate-400">Pair your ASTRA wearable for one-tap discrete safety alerts.</p>
            </div>
            
            {paired ? (
              <div className="bg-emerald-500/10 text-emerald-400 py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 border border-emerald-500/20">
                <CheckCircle2 size={24} />
                <span className="font-bold">Astra Core Ring Connected</span>
              </div>
            ) : (
              <button 
                onClick={handlePair}
                disabled={pairing}
                className="w-full py-5 bg-rose-600 rounded-3xl font-bold text-lg hover:bg-rose-700 transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
              >
                {pairing ? 'Searching for devices...' : 'Pair My Device'}
              </button>
            )}
            <button onClick={() => setStep(2)} className="text-slate-500 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">Skip for now</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="w-24 h-24 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center mx-auto">
              <Shield className="w-12 h-12 text-indigo-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Permissions</h2>
              <p className="text-slate-400">To protect you, ASTRA needs access to your location and notifications.</p>
            </div>
            <div className="space-y-4 text-left">
              {['Location (Always)', 'Notifications', 'Microphone (Crisis Monitoring)'].map(p => (
                <div key={p} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="font-medium text-slate-200">{p}</span>
                  <div className="w-10 h-5 bg-emerald-500 rounded-full flex items-center justify-end px-1">
                    <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setStep(3)}
              className="w-full py-5 bg-indigo-600 rounded-3xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center space-x-3"
            >
              <span>Continue</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="w-32 h-32 bg-rose-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-rose-600/30">
              <Shield className="w-16 h-16 text-white fill-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Setup Complete</h2>
              <p className="text-slate-400">You are now part of the ASTRA network. Your safety circle is one tap away.</p>
            </div>
            <button 
              onClick={onComplete}
              className="w-full py-5 bg-white text-slate-950 rounded-3xl font-bold text-lg hover:bg-rose-50 transition-all"
            >
              Enter Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
