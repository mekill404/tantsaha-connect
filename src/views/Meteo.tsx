import Header from '../components/layout/Header';
import { useApp } from '../context/AppContext';

const Meteo = () => {
  const { weather, loading } = useApp();
  if (loading) return null; 

  if (!weather) return (
    <div className="p-10 text-center">
      <i className="fa-solid fa-triangle-exclamation text-tantsaha-orange text-4xl mb-4"></i>
      <p className="font-black text-slate-500 uppercase">Tsy azo ny toetr'andro</p>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <Header 
        title="Toetr'andro" 
        subtitle={`Mety ho ${weather.current.condition} any Antananarivo`} 
      />

      <section className="bg-white border-4 border-tantsaha-blue border-b-8 rounded-[35px] p-8 mb-8 flex flex-col items-center text-center shadow-sm">
        <i className={`fa-solid ${weather.current.iconClass} text-7xl text-tantsaha-blue drop-shadow-[0_4px_0_#e2e8f0] mb-4`}></i>
        <h2 className="text-6xl font-black text-slate-800 tracking-tighter">{weather.current.temp}°</h2>
        <p className="text-tantsaha-blue font-black uppercase tracking-widest text-sm">{weather.current.condition}</p>
        
        <div className="flex gap-8 mt-8 w-full justify-center border-t-2 border-slate-50 pt-6">
          <div className="flex flex-col items-center">
            <i className="fa-solid fa-droplet text-tantsaha-blue mb-1"></i>
            <span className="font-black text-slate-700">{weather.current.humidity}</span>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Hamandoana</p>
          </div>
          <div className="flex flex-col items-center">
            <i className="fa-solid fa-wind text-slate-400 mb-1"></i>
            <span className="font-black text-slate-700">{weather.current.wind}</span>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Rivotra</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-black text-slate-700 mb-6 uppercase tracking-widest px-2">Tondro 5 andro</h3>
        <div className="bg-slate-50 border-2 border-slate-200 rounded-[30px] overflow-hidden">
          {weather.forecast.map((item: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-5 border-b-2 border-slate-100 last:border-0 hover:bg-white transition-colors">
              <span className="flex-1 font-black text-slate-600 uppercase text-[10px]">{item.day}</span>
              <div className="flex-1 flex items-center justify-center gap-4">
                <i className={`fa-solid ${item.icon} text-2xl ${item.color}`}></i>
                <span className="text-[9px] font-black text-tantsaha-blue bg-tantsaha-blue/10 px-2 py-0.5 rounded-lg">{item.chance}</span>
              </div>
              <span className="flex-1 text-right font-black text-slate-800 text-lg">{item.temp}°</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Meteo;