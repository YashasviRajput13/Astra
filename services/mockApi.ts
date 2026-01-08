
import { User, EmergencyContact, Device, SOSAlert, Location, CrowdAnalysis } from '../types';

const STORAGE_KEYS = {
  USER: 'astra_user',
  CONTACTS: 'astra_contacts',
  DEVICES: 'astra_devices',
  ALERTS: 'astra_alerts',
  ACTIVE_ALERT: 'astra_active_alert'
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const mockApi = {
  // Auth
  login: async (email: string): Promise<User> => {
    await delay(800);
    const user: User = {
      id: 'u123',
      name: email.split('@')[0],
      email,
      phone: '+1 555 0101',
      role: 'USER',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_ALERT);
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  // Contacts
  getContacts: async (): Promise<EmergencyContact[]> => {
    const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    if (!data) {
      const initial: EmergencyContact[] = [
        { id: 'c1', name: 'Sarah Mom', phone: '+1 555 0202', relationship: 'Mother', isVerified: true }
      ];
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  },

  addContact: async (contact: Omit<EmergencyContact, 'id' | 'isVerified'>): Promise<EmergencyContact> => {
    await delay(500);
    const contacts = await mockApi.getContacts();
    const newContact: EmergencyContact = { ...contact, id: `c${Date.now()}`, isVerified: true };
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify([...contacts, newContact]));
    return newContact;
  },

  // Devices
  getDevices: async (): Promise<Device[]> => {
    const data = localStorage.getItem(STORAGE_KEYS.DEVICES);
    if (!data) return [];
    return JSON.parse(data);
  },

  pairDevice: async (name: string, sn: string): Promise<Device> => {
    await delay(1200);
    const devices = await mockApi.getDevices();
    const newDevice: Device = {
      id: `d${Date.now()}`,
      name,
      serialNumber: sn,
      status: 'CONNECTED',
      batteryLevel: 98
    };
    localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify([...devices, newDevice]));
    return newDevice;
  },

  // SOS & Alerts
  triggerSOS: async (location: Location): Promise<SOSAlert> => {
    await delay(300);
    const user = mockApi.getCurrentUser();
    const newAlert: SOSAlert = {
      id: `sos${Date.now()}`,
      userId: user?.id || 'anon',
      userName: user?.name || 'User',
      timestamp: Date.now(),
      status: 'ACTIVE',
      locations: [location],
      crowdAnalysis: {
        density: 'UNKNOWN',
        confidence: 0,
        signals: ['GPS'],
        lastUpdated: Date.now()
      }
    };
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ALERT, JSON.stringify(newAlert));
    
    // Add to history
    const history = await mockApi.getAlertHistory();
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify([newAlert, ...history]));
    
    return newAlert;
  },

  getActiveAlert: (): SOSAlert | null => {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_ALERT);
    return data ? JSON.parse(data) : null;
  },

  updateCrowdAnalysis: async (alertId: string, analysis: CrowdAnalysis): Promise<void> => {
    const active = mockApi.getActiveAlert();
    if (active && active.id === alertId) {
      active.crowdAnalysis = analysis;
      localStorage.setItem(STORAGE_KEYS.ACTIVE_ALERT, JSON.stringify(active));
    }
  },

  resolveAlert: async (alertId: string, note: string): Promise<void> => {
    await delay(500);
    const history = await mockApi.getAlertHistory();
    const updatedHistory = history.map(a => 
      a.id === alertId ? { ...a, status: 'RESOLVED', resolutionNote: note } : a
    );
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(updatedHistory));
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_ALERT);
  },

  cancelAlert: async (alertId: string): Promise<void> => {
    await delay(500);
    const history = await mockApi.getAlertHistory();
    const updatedHistory = history.map(a => 
      a.id === alertId ? { ...a, status: 'CANCELLED', resolutionNote: 'Accidental trigger' } : a
    );
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(updatedHistory));
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_ALERT);
  },

  getAlertHistory: async (): Promise<SOSAlert[]> => {
    const data = localStorage.getItem(STORAGE_KEYS.ALERTS);
    return data ? JSON.parse(data) : [];
  },

  updateLocation: async (alertId: string, location: Location): Promise<void> => {
    const active = mockApi.getActiveAlert();
    if (active && active.id === alertId) {
      active.locations.push(location);
      localStorage.setItem(STORAGE_KEYS.ACTIVE_ALERT, JSON.stringify(active));
    }
  }
};
