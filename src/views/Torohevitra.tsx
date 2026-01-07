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
    return () => {
      window.speechSynthesis.cancel();
    };
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
    utterance.rate = 0.85;
    utterance.pitch = 1;

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
    <div className="pb-40 relative overflow-x-hidden px-4">
      <Header title="Torohevitra" subtitle={`${filteredConseils.length} torohevitra`} />

      <CategoryFilter activeTab={activeTab} onSelect={setActiveTab} />

      <div className="space-y-4">
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

      {/* Lecteur Audio Flottant (Player) */}
      {playingId && (
        <div className="fixed bottom-24 left-4 right-4 z-50 animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-[30px] p-4 shadow-2xl flex items-center gap-4 border-b-4 border-tantsaha-blue">
            <div className="w-12 h-12 bg-tantsaha-blue rounded-2xl flex items-center justify-center shrink-0">
               {/* Animation d'onde sonore */}
              <div className="flex gap-1 items-center justify-center">
                <span className={`w-1 bg-white rounded-full ${!isPaused ? 'animate-[bounce_0.6s_infinite]' : 'h-2'}`} style={{height: '12px'}}></span>
                <span className={`w-1 bg-white rounded-full ${!isPaused ? 'animate-[bounce_0.8s_infinite]' : 'h-4'}`} style={{height: '20px'}}></span>
                <span className={`w-1 bg-white rounded-full ${!isPaused ? 'animate-[bounce_0.6s_infinite]' : 'h-2'}`} style={{height: '12px'}}></span>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black uppercase text-tantsaha-blue tracking-widest">
                {isPaused ? "Mijanona kely" : "Henoy ny torohevitra"}
              </p>
              <p className="text-xs font-bold truncate">
                {conseilsData.find(c => c.id === playingId)?.title}
              </p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={togglePause}
                className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all active:scale-90"
              >
                <i className={`fa-solid ${isPaused ? 'fa-play' : 'fa-pause'}`}></i>
              </button>
              <button 
                onClick={stopAudio}
                className="w-11 h-11 bg-red-500 text-white rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-red-500/20"
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