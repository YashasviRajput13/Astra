
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { mockApi } from './services/mockApi';
import { AuthState, User, Location } from './types';

// Components & Pages
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import History from './pages/History';
import Onboarding from './pages/Onboarding';
import LiveAlert from './pages/LiveAlert';
import Settings from './pages/Settings';
import CrowdMonitor from './pages/CrowdMonitor';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });
  const [isOnboarding, setIsOnboarding] = useState(false);

  useEffect(() => {
    const user = mockApi.getCurrentUser();
    if (user) {
      setAuth({ user, isAuthenticated: true, isLoading: false });
    } else {
      setAuth({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const handleLogin = async () => {
    const user = await mockApi.login('clara@example.com');
    setAuth({ user, isAuthenticated: true, isLoading: false });
    const devices = await mockApi.getDevices();
    if (devices.length === 0) {
      setIsOnboarding(true);
    }
  };

  const handleLogout = () => {
    mockApi.logout();
    setAuth({ user: null, isAuthenticated: false, isLoading: false });
  };

  const triggerSOS = async () => {
    // Attempt to get real location
    let location: Location = { lat: 40.7128, lng: -74.0060, timestamp: Date.now() };
    try {
      navigator.geolocation.getCurrentPosition((pos) => {
        location = { lat: pos.coords.latitude, lng: pos.coords.longitude, timestamp: Date.now() };
      });
    } catch (e) {}
    
    await mockApi.triggerSOS(location);
    window.location.hash = '/live-alert';
  };

  if (auth.isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div></div>;

  if (!auth.isAuthenticated) {
    return <Landing onStart={handleLogin} />;
  }

  if (isOnboarding) {
    return <Onboarding onComplete={() => setIsOnboarding(false)} />;
  }

  return (
    <HashRouter>
      <Layout user={auth.user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard onTriggerSOS={triggerSOS} />} />
          <Route path="/monitor" element={<CrowdMonitor />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/history" element={<History />} />
          <Route path="/live-alert" element={<LiveAlert onResolve={() => window.location.hash = '/dashboard'} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
