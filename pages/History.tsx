
import React, { useState, useEffect } from 'react';
import { History as HistoryIcon, MapPin, Calendar, Clock, CheckCircle2, ChevronDown, Shield } from 'lucide-react';
import { mockApi } from '../services/mockApi';
import { SOSAlert } from '../types';

const History: React.FC = () => {
  const [alerts, setAlerts] = useState<SOSAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getAlertHistory().then(data => {
      setAlerts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold">Alert History</h2>
        <p className="text-slate-400">Review past SOS events and resolution reports.</p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="glass-morphism p-6 rounded-3xl border border-white/5 space-y-4 hover:bg-white/5 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${alert.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                  <HistoryIcon size={20} />
                </div>
                <div>
                  <h4 className="font-bold">SOS Dispatch {alert.id.slice(-4)}</h4>
                  <div className="flex items-center space-x-4 text-xs text-slate-500 font-medium">
                    <span className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{new Date(alert.timestamp).toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                alert.status === 'RESOLVED' ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'
              }`}>
                {alert.status}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl flex items-center space-x-3">
                <MapPin className="text-slate-400" size={16} />
                <div className="text-sm">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Trigger Location</p>
                  <p className="font-mono text-slate-300">Verified GPS Lock</p>
                </div>
              </div>
              {alert.status === 'RESOLVED' && (
                <div className="bg-emerald-500/5 p-4 rounded-2xl flex items-center space-x-3 border border-emerald-500/10">
                  <CheckCircle2 className="text-emerald-400" size={16} />
                  <div className="text-sm">
                    <p className="text-[10px] text-emerald-500 font-bold uppercase">Resolution</p>
                    <p className="text-slate-300 truncate italic">"{alert.resolutionNote || 'No notes provided'}"</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {alerts.length === 0 && !loading && (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-600 border border-slate-800">
              {/* Added Shield icon fix here */}
              <Shield size={32} />
            </div>
            <p className="text-slate-500 italic">No safety incidents recorded. Stay safe!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
