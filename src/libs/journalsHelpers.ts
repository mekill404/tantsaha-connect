export const getIconByType = (type: string) => {
  switch (type) {
    case 'fambolena': return 'fa-seedling';
    case 'meteo': return 'fa-cloud-rain';
    case 'bibikely': return 'fa-bug';
    default: return 'fa-book';
  }
};

export const getColorByType = (type: string) => {
  switch (type) {
    case 'fambolena': return 'bg-tantsaha-green';
    case 'meteo': return 'bg-tantsaha-blue';
    case 'bibikely': return 'bg-red-500';
    default: return 'bg-slate-400';
  }
};

export const formatDate = (date: Date) => {
  const monthYear = new Intl.DateTimeFormat('fr-FR', { 
    month: 'short', 
    year: 'numeric' 
  }).format(date);

  const fullDate = new Intl.DateTimeFormat('fr-FR', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  }).format(date);

  return { monthYear, fullDate };
};