
export type UserRole = 'USER' | 'EMERGENCY_CONTACT';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  token?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isVerified: boolean;
}

export interface Device {
  id: string;
  name: string;
  serialNumber: string;
  status: 'CONNECTED' | 'DISCONNECTED';
  batteryLevel: number;
}

export interface Location {
  lat: number;
  lng: number;
  timestamp: number;
  accuracy?: number;
}

export type CrowdDensity = 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN';

export interface CrowdAnalysis {
  density: CrowdDensity;
  confidence: number;
  signals: string[];
  lastUpdated: number;
}

export interface SOSAlert {
  id: string;
  userId: string;
  userName: string;
  timestamp: number;
  status: 'ACTIVE' | 'RESOLVED' | 'CANCELLED';
  locations: Location[];
  audioRecordingUrl?: string;
  resolutionNote?: string;
  crowdAnalysis?: CrowdAnalysis;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
