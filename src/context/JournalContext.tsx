import React, { createContext, useContext, useState, useEffect } from 'react';
import initialData from '../data/entries.json';
import { getIconByType, getColorByType, formatDate } from '../libs/journalsHelpers';

const JournalContext = createContext<any>(null);

export const JournalProvider = ({ children }: { children: React.ReactNode }) => {
  const [entries, setEntries] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tantsaha_journal');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEntries(parsed);
          setSelectedMonth(parsed[0].month);
        } else {
          setEntries(initialData);
          if (initialData.length > 0) setSelectedMonth(initialData[0].month);
        }
      } else {
        setEntries(initialData);
        if (initialData.length > 0) setSelectedMonth(initialData[0].month);
      }
    } catch (error) {
      console.error("Erreur de lecture des données:", error);
      setEntries(initialData);
    } finally {
      setIsLoaded(true); 
    }
  }, []);
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('tantsaha_journal', JSON.stringify(entries));
    }
  }, [entries, isLoaded]);
  const saveNewEntry = (formData: any) => {
    const { monthYear, fullDate } = formatDate(new Date());
    const newEntry = {
      ...formData,
      id: Date.now(),
      date: fullDate,
      month: monthYear,
      icon: getIconByType(formData.type),
      colorClass: getColorByType(formData.type)
    };
    
    setEntries(prev => [newEntry, ...prev]);
    setSelectedMonth(monthYear);
  };
  const deleteEntry = (id: number) => {
    if (window.confirm("Tena hifafa ity ve ianao?")) {
      const updated = entries.filter(e => e.id !== id);
      setEntries(updated);
      if (updated.length > 0 && !updated.some(e => e.month === selectedMonth)) {
        setSelectedMonth(updated[0].month);
      }
    }
  };
  const availableMonths = Array.from(new Set(entries.map(e => e.month)));
  return (
    <JournalContext.Provider value={{ 
      entries, 
      selectedMonth, 
      setSelectedMonth, 
      saveNewEntry, 
      deleteEntry,
      availableMonths,
      isLoaded 
    }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
};