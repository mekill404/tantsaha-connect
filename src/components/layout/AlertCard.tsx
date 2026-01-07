import type { AlertCardProps } from '../../types/alertcard.props';
import Button from './Button';

const AlertCard: React.FC<AlertCardProps> = ({ title, madLabel, description, date, icon, type }) => {
  const config = {
    maika: { bg: 'bg-white', border: 'border-red-500', iconBg: 'bg-red-500', textColor: 'text-red-500' },
    'zava-dehibe': { bg: 'bg-white', border: 'border-tantsaha-orange', iconBg: 'bg-tantsaha-orange', textColor: 'text-tantsaha-orange' },
    mahazatra: { bg: 'bg-white', border: 'border-tantsaha-blue', iconBg: 'bg-tantsaha-blue', textColor: 'text-tantsaha-blue' },
  };
  const style = config[type];
  
  return (
    <div className={`${style.bg} border-2 ${style.border} border-b-8 rounded-[30px] p-5 flex gap-4 items-center transition-all active:border-b-2 active:translate-y-1 mb-4`}>
      <div className={`${style.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
        <i className={`fa-solid ${icon} drop-shadow-md`}></i>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-black text-slate-800 text-lg uppercase tracking-tight">{title}</h4>
          <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded-lg uppercase">
            {date}
          </span>
        </div>
        <p className={`${style.textColor} font-black text-sm`}>{madLabel}</p>
        <p className="text-slate-500 text-xs font-bold mt-1">{description}</p>
        
        <div className="mt-3">
          <Button 
            label="Hihaino" 
            icon="fa-volume-high" 
            onClick={() => console.log('Playing audio...')}
            className="py-1 px-4 text-[10px]"
            colorClass={style.iconBg}
            borderClass={style.border.replace('border-', 'border-b-')}
          />
        </div>
      </div>
    </div>
  );
};

export default AlertCard;