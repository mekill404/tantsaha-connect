import { useState } from 'react';
import Header from '../components/layout/Header';
import AlertCard from '../components/layout/AlertCard';
import { useApp } from '../context/AppContext';

const FilterTab = ({ label, icon, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`
    ${active ? 'bg-tantsaha-blue text-white border-tantsaha-blue-border shadow-lg' : 'bg-slate-100 text-slate-500 border-slate-200'}
    border-b-4 px-4 py-2 rounded-xl font-black text-[10px] md:text-xs uppercase whitespace-nowrap 
    transition-all active:border-b-0 active:translate-y-1 cursor-pointer
  `}>
    <i className={`fa-solid ${icon} mr-2`}></i> {label}
  </button>
);

const Alert = () => {
  const { alerts, markAsRead, markAllAsRead, unreadCount } = useApp();
  const [filter, setFilter] = useState('all');
  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === filter);

  return (
    <div className="pb-32 px-5 min-h-screen bg-white animate-in fade-in slide-in-from-bottom-4 duration-500"> 
      
      <div className="flex justify-between items-center">
        <Header 
          title="Fanairana" 
          subtitle={`${unreadCount} fanairana vaovao`} 
        />
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-[10px] font-black text-tantsaha-blue uppercase bg-tantsaha-blue/10 px-4 py-2 rounded-xl active:scale-95 transition-all"
          >
            Vakiana daholo
          </button>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar -mx-2 px-2">
        <FilterTab label="Rehetra" icon="fa-list" active={filter === 'all'} onClick={() => setFilter('all')} />
        <FilterTab label="Maika" icon="fa-circle-exclamation" active={filter === 'maika'} onClick={() => setFilter('maika')} />
        <FilterTab label="Zava-dehibe" icon="fa-triangle-exclamation" active={filter === 'zava-dehibe'} onClick={() => setFilter('zava-dehibe')} />
        <FilterTab label="Mahazatra" icon="fa-circle-info" active={filter === 'mahazatra'} onClick={() => setFilter('mahazatra')} />
      </div>

      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <div 
              key={alert.id} 
              onClick={() => markAsRead(alert.id)}
              className={`relative transition-all duration-300 cursor-pointer ${alert.isRead ? 'opacity-50 grayscale-[0.5]' : 'opacity-100'}`}
            >
              {!alert.isRead && (
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-tantsaha-blue rounded-full border-2 border-white z-10 shadow-sm animate-pulse"></span>
              )}
              
              <div className={alert.id.startsWith('weather') ? "border-l-4 border-tantsaha-blue rounded-r-2xl" : ""}>
                <AlertCard {...alert} />
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center border-4 border-dashed border-slate-100 rounded-[40px] mt-10">
            <i className="fa-solid fa-check-double text-slate-200 text-5xl mb-4"></i>
            <p className="font-black text-slate-300 uppercase tracking-widest text-sm">Tsy misy fanairana vaovao</p>
          </div>
        )}
      </div>
      {alerts.some(a => a.type === 'maika' && !a.isRead) && (
        <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-10 md:w-80 bg-red-500 p-4 border-b-4 border-red-700 rounded-2xl flex justify-between items-center z-40 shadow-2xl animate-bounce-subtle">
          <div className="flex items-center gap-3 text-white font-black uppercase text-[10px]">
            <i className="fa-solid fa-triangle-exclamation animate-pulse"></i>
            <span>Misy fanairana maika mbola tsy voavaky!</span>
          </div>
          <button 
             onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
             className="bg-white text-red-500 px-2 py-1 rounded-lg text-[10px] font-black"
          >
            JEREO
          </button>
        </div>
      )}
    </div>
  );
};

export default Alert;