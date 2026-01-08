
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Home, Users, History, Settings, LogOut, Radar } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
}

const LOGO_URL = "https://media.istockphoto.com/id/1360805952/vector/portrait-of-a-strong-woman-in-half-turn-avatar.jpg?s=612x612&w=0&k=20&c=PJCBU-7SFqnwfFI-NQUcHqRcxvcCayB1U8lD1C9FROU=";

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: Home, path: '/dashboard' },
    { label: 'Monitor', icon: Radar, path: '/monitor' },
    { label: 'Contacts', icon: Users, path: '/contacts' },
    { label: 'History', icon: History, path: '/history' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 glass-morphism border-r border-slate-800 p-6 space-y-8">
        <div className="flex items-center space-x-3 text-rose-500 font-bold text-2xl cursor-pointer group" onClick={() => navigate('/dashboard')}>
          <div className="relative">
            {/* Bright Light coming from background */}
            <div className="absolute inset-0 bg-rose-500/40 blur-xl rounded-full scale-125 -z-10 group-hover:bg-rose-400/60 transition-colors" />
            
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.2)] relative z-10 bg-slate-900">
              <img src={LOGO_URL} alt="ASTRA" className="w-full h-full object-cover" />
            </div>
          </div>
          <span className="tracking-tight italic uppercase font-black">ASTRA</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-rose-500/20 text-rose-400' : 'hover:bg-white/5 text-slate-400'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 glass-morphism sticky top-0 z-50">
        <div className="flex items-center space-x-3 text-rose-500 font-bold text-xl">
          <div className="relative">
             <div className="absolute inset-0 bg-rose-500/30 blur-lg rounded-full -z-10" />
             <div className="w-12 h-12 rounded-xl overflow-hidden border border-rose-500/30 relative z-10 bg-slate-900">
               <img src={LOGO_URL} alt="ASTRA" className="w-full h-full object-cover" />
             </div>
          </div>
          <span className="tracking-tight italic uppercase font-black">ASTRA</span>
        </div>
        <button onClick={onLogout} className="p-2 text-slate-400">
          <LogOut size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0 relative">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 glass-morphism border-t border-slate-800 flex items-center justify-around px-4 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 ${
                isActive ? 'text-rose-500' : 'text-slate-500'
              }`}
            >
              <Icon size={18} />
              <span className="text-[9px] uppercase tracking-wider font-bold">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
