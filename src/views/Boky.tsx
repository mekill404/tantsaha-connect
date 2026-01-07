import { useState } from 'react';
import { useJournal } from '../context/JournalContext';
import Header from '../components/layout/Header';
import EntryCard from '../components/ui/EntryCard';
import EntryModal from '../components/boky/EntryModal';
import Popup from '../components/layout/Popup';
import Button from '../components/layout/Button';

const Boky = () => {
  const { 
    entries, 
    selectedMonth, 
    setSelectedMonth, 
    saveNewEntry, 
    deleteEntry, 
    availableMonths, 
    isLoaded 
  } = useJournal();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-tantsaha-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-black text-slate-400 uppercase text-xs tracking-widest">Andraso kely...</p>
        </div>
      </div>
    );
  }
  const filteredEntries = entries.filter((e: any) => e.month === selectedMonth);
  return (
    <div className="relative min-h-screen pb-24">
      <Header title="Boky" subtitle={`${entries.length} firaketana`} />
      <Button 
        label="Hampiditra asa vaovao"
        icon="fa-plus"
        onClick={() => setIsAddModalOpen(true)}
        className="w-full py-4 mb-8 text-sm shadow-xl"
        colorClass="bg-tantsaha-green"
        borderClass="border-tantsaha-green-border"
      />
      <div className="flex gap-2 mb-8 overflow-x-auto pb-4 no-scrollbar">
        {availableMonths.map((m: string) => (
          <button 
            key={m} 
            onClick={() => setSelectedMonth(m)} 
            className={`px-6 py-2 rounded-2xl font-black text-[10px] uppercase transition-all border-b-4 whitespace-nowrap 
              ${selectedMonth === m 
                ? 'bg-tantsaha-blue text-white border-tantsaha-blue-border -translate-y-1' 
                : 'bg-white text-slate-400 border-slate-200 active:border-b-0 active:translate-y-1'}`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry: any) => (
            <div key={entry.id} onClick={() => setSelectedEntry(entry)} className="cursor-pointer">
              <EntryCard {...entry} />
            </div>
          ))
        ) : (
          <div className="text-center py-20 border-4 border-dashed border-slate-100 rounded-[40px] flex flex-col items-center justify-center gap-4">
            <i className="fa-solid fa-folder-open text-4xl text-slate-100"></i>
            <p className="font-black text-slate-300 uppercase italic text-xs tracking-wider">
              Tsy misy na inona na inona ato
            </p>
          </div>
        )}
      </div>
      <EntryModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSave={(data: any) => {
          saveNewEntry(data);
          setIsAddModalOpen(false);
        }} 
      />    
      <Popup 
        item={selectedEntry} 
        onClose={() => setSelectedEntry(null)} 
        onDelete={(id: number) => {
          deleteEntry(id);
          setSelectedEntry(null); 
        }} 
      />
    </div>
  );
};

export default Boky;