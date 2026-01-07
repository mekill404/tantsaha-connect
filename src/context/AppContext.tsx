import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/weather.services';
import alertsRawData from '../data/alerts.json';
import type { AlertCardProps } from '../types/alertcard.props';

export interface AppAlert extends AlertCardProps {
  id: string;
  isRead: boolean;
}

interface AppContextType {
  loading: boolean;
  alerts: AppAlert[];
  unreadCount: number;
  totalAlerts: number;
  weather: any;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<any>(null);
  const [alerts, setAlerts] = useState<AppAlert[]>([]);

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, isRead: true })));
  };

  useEffect(() => {
    const initApp = async () => {
      try {
        const weatherData = await fetchWeatherData();
        setWeather(weatherData);

        const staticAlerts: AppAlert[] = (alertsRawData as any[]).map(a => ({
          ...a,
          id: `static-${a.id}`,
          isRead: false
        }));

        const dynamicAlerts: AppAlert[] = [];
        const condition = weatherData.current?.condition?.toLowerCase() || "";
        const temp = weatherData.current?.temp || 0;

        if (condition.includes('pluie') || condition.includes('orage')) {
          dynamicAlerts.push({
            id: 'weather-rain',
            title: "Tandremo ny orana",
            madLabel: "Misy orana ny andro",
            description: "Mety hisy fiantraikany amin'ny fambolena ny rotsakorana anio.",
            date: "Anio",
            icon: "fa-cloud-showers-heavy",
            type: "maika",
            isRead: false
          });
        }

        if (temp > 32) {
          dynamicAlerts.push({
            id: 'weather-heat',
            title: "Hafanana be",
            madLabel: "Mafana be ny andro",
            description: "Tandremo ny zavamaniry, mila tondrahana matetika.",
            date: "Anio",
            icon: "fa-temperature-high",
            type: "zava-dehibe",
            isRead: false
          });
        }

        setAlerts([...dynamicAlerts, ...staticAlerts]);
      } catch (e) {
        console.error("Erreur lors de l'initialisation", e);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };
    initApp();
  }, []);

  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <AppContext.Provider value={{ 
      loading, 
      alerts, 
      unreadCount, 
      totalAlerts: unreadCount, 
      weather, 
      markAsRead, 
      markAllAsRead 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};