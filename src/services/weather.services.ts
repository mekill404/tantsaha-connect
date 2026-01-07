const API_KEY = 'b2fbe98bc379f0f8c9f39e0985349a22'; 
const CITY = 'Antananarivo';
const STORAGE_KEY = 'tantsaha_weather_cache';

export const fetchWeatherData = async () => {
  const today = new Date().toDateString();
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) {
    const { date, data } = JSON.parse(cached);
    if (date === today) {
      console.log("Utilisation des données météo en cache");
      return data;
    }
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&lang=fr&appid=${API_KEY}`
    );
    
    const data = await response.json();
    const formattedData = {
      current: {
        temp: Math.round(data.list[0].main.temp),
        condition: data.list[0].weather[0].description,
        iconClass: mapWeatherToIcon(data.list[0].weather[0].main),
        humidity: data.list[0].main.humidity + "%",
        wind: Math.round(data.list[0].wind.speed * 3.6) + " km/h"
      },
      forecast: data.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 5).map((item: any) => ({
        day: new Intl.DateTimeFormat('mg-MG', { weekday: 'long' }).format(new Date(item.dt * 1000)),
        icon: mapWeatherToIcon(item.weather[0].main),
        temp: Math.round(item.main.temp),
        chance: item.pop ? Math.round(item.pop * 100) + "%" : "0%",
        color: item.weather[0].main === 'Rain' ? 'text-tantsaha-blue' : 'text-tantsaha-yellow'
      }))
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, data: formattedData }));
    return formattedData;

  } catch (error) {
    return cached ? JSON.parse(cached).data : getMockData();
  }
};

const getMockData = () => ({
  current: { temp: 24, condition: "Andraso kely...", iconClass: "fa-clock", humidity: "60%", wind: "10 km/h" },
  forecast: []
});

const mapWeatherToIcon = (main: string) => {
    switch (main) {
      case 'Clouds': return 'fa-cloud';
      case 'Rain': return 'fa-cloud-showers-heavy';
      case 'Clear': return 'fa-sun';
      case 'Thunderstorm': return 'fa-cloud-bolt';
      default: return 'fa-cloud-sun';
    }
};