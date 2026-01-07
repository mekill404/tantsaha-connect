import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import MeteoWidget from '../components/ui/MeteoWidget';
import ActionCard from '../components/layout/ActionCard';
import { fetchWeatherData } from '../services/weather.services';
import alertsData from '../data/alerts.json';
import InstallButton from '../components/InstallButton';

const Home = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [autoAlertsCount, setAutoAlertsCount] = useState(0);

  const appData = {
    title: "Tantsaha Connect",
    subtitle: "Mampahery ny tantsaha malagasy",
  };

  useEffect(() => {
    const getLiveUpdates = async () => {
      setLoading(true);
      const data = await fetchWeatherData();
      setWeatherData(data.current);

      let counts = 0;
      const condition = data.current.condition.toLowerCase();
      const temp = data.current.temp;
      const windSpeed = parseInt(data.current.wind);

      if (condition.includes('pluie') || condition.includes('orage') || condition.includes('averse')) {
        counts++;
      }
      if (temp > 32) {
        counts++;
      }
      if (windSpeed > 25) {
        counts++;
      }

      setAutoAlertsCount(counts);
      setLoading(false);
    };

    getLiveUpdates();
  }, []);

  const totalAlerts = alertsData.length + autoAlertsCount;

  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="bg-white min-h-screen font-sans pb-10">
      <main className="p-5 md:p-10 max-w-6xl mx-auto">
        <Header title={appData.title} subtitle={appData.subtitle} />
        <InstallButton />
        <MeteoWidget 
          temp={loading ? 0 : weatherData?.temp} 
          condition={loading ? "Andraso kely..." : weatherData?.condition} 
          iconClass={loading ? "fa-circle-notch animate-spin" : weatherData?.iconClass}
          onViewDetails={() => navigateTo('/toetr_andro')}
        />

        <div className="flex items-center gap-3 mb-6 mt-8">
          <div className="w-2 h-8 bg-tantsaha-green rounded-full"></div>
          <h3 className="text-xl font-black text-slate-700 uppercase tracking-widest">Asa lehibe</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <ActionCard 
            title="Toetr'andro" 
            icon="fa-cloud-sun-rain" 
            colorClass="bg-tantsaha-blue" 
            borderClass="border-tantsaha-blue-border" 
            onClick={() => navigateTo('/toetr_andro')}
          />

          <ActionCard 
            title="Fanairana" 
            icon="fa-triangle-exclamation" 
            colorClass="bg-tantsaha-orange" 
            borderClass="border-tantsaha-orange-border" 
            badge={totalAlerts > 0 ? totalAlerts : undefined} 
            onClick={() => navigateTo('/fanairana')} 
          />

          {/* ... autres ActionCards ... */}
          <ActionCard 
            title="Boky" 
            icon="fa-book-bookmark" 
            colorClass="bg-tantsaha-purple" 
            borderClass="border-tantsaha-purple-border" 
            onClick={() => navigateTo('/boky')}
          />
          <ActionCard 
            title="Torohevitra" 
            icon="fa-lightbulb" 
            colorClass="bg-tantsaha-yellow" 
            borderClass="border-tantsaha-yellow-border" 
            onClick={() => navigateTo('/torohevitra')}
          />
        </div>

        <div className="mt-16 flex flex-col items-center">
          <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 border-b-4 border-slate-200 rounded-2xl">
            <i className={`fa-solid ${loading ? 'fa-spinner animate-spin text-slate-300' : 'fa-check-double text-tantsaha-green'}`}></i>
            <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">
              {loading ? "Mizaha ny vaovao..." : "Mandeha tsara ny rafitra"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;