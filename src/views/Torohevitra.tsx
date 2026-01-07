import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import CategoryFilter from '../components/torohevitra/CategoryFilter';
import ConseilCard from '../components/torohevitra/ConseilCard';
import Popup from '../components/layout/Popup';
import conseilsData from '../data/conseils.json';

const Torohevitra = () => {
  const [activeTab, setActiveTab] = useState('rehetra');
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [readingItem, setReadingItem] = useState<any>(null);
  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);
  const handlePlayAudio = (item: any) => {
    if (playingId === item.id) {
      stopAudio();
      return;
    }
    window.speechSynthesis.cancel();
    const textToRead = `${item.title}. ${item.content || item.description}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'fr-FR'; 
    utterance.rate = 0.9; 
    utterance.onstart = () => {
      setPlayingId(item.id);
      setIsPaused(false);
    };
    utterance.onend = () => {
      setPlayingId(null);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setPlayingId(null);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };
  const togglePause = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };
  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setPlayingId(null);
    setIsPaused(false);
  };
  const filteredConseils = activeTab === 'rehetra' 
    ? conseilsData 
    : conseilsData.filter(c => c.category === activeTab);

  return (
    <div className="pb-32 relative">
      <Header title="Torohevitra" subtitle={`${filteredConseils.length} torohevitra`} />

      <CategoryFilter activeTab={activeTab} onSelect={setActiveTab} />

      <div className="space-y-4 px-1">
        {filteredConseils.map((item) => (
          <ConseilCard 
            key={item.id} 
            item={item} 
            isPlaying={playingId === item.id}
            onPlay={() => handlePlayAudio(item)}
            onRead={() => setReadingItem(item)}
          />
        ))}
      </div>
      {playingId && (
        <div className="fixed bottom-24 left-4 right-4 z-100 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-slate-900 text-white rounded-[25px] p-3 shadow-2xl flex items-center gap-4 border-b-4 border-tantsaha-blue">
            <div className="w-10 h-10 bg-tantsaha-blue rounded-xl flex items-center justify-center animate-pulse shrink-0">
              <i className="fa-solid fa-waveform text-sm"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black uppercase truncate tracking-wider">
                {isPaused ? "Mijanona kely..." : "Mandeha ny fihainoana..."}
              </p>
              <p className="text-[8px] text-slate-400 font-bold uppercase truncate">
                {conseilsData.find(c => c.id === playingId)?.title}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={togglePause}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
              >
                <i className={`fa-solid ${isPaused ? 'fa-play' : 'fa-pause'}`}></i>
              </button>
              <button 
                onClick={stopAudio}
                className="w-10 h-10 bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-stop"></i>
              </button>
            </div>
          </div>
        </div>
      )}
      {readingItem && (
        <Popup 
          item={readingItem} 
          onClose={() => setReadingItem(null)} 
        />
      )}
    </div>
  );
};

export default Torohevitra;