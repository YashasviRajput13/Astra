
import React from 'react';
import { Shield, Bell, Zap, MapPin, Users, Smartphone } from 'lucide-react';

export const APP_NAME = "ASTRA";
export const MISSION_STATISTIC = "1 in 3 women experience violence. In these moments, seconds are everything and your phone might not be accessible.";

export const FEATURES = [
  {
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    title: "Instant Trigger",
    description: "Discrete physical button or voice activation for immediate alert dispatch."
  },
  {
    icon: <Users className="w-6 h-6 text-indigo-400" />,
    title: "Multi-Contact Flow",
    description: "Notify all emergency contacts simultaneously via SMS, Call, and App."
  },
  {
    icon: <MapPin className="w-6 h-6 text-rose-400" />,
    title: "Real-time Tracking",
    description: "Live GPS location updates shared with your trusted circle."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
    title: "Wearable Sync",
    description: "Seamlessly pairs with rings, bracelets, or smart tags."
  }
];
