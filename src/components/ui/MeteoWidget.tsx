import type { MeteoProps } from '../../types/meteo.props';
import Button from '../layout/Button';

const MeteoWidget: React.FC<MeteoProps> = ({ temp, condition, iconClass, onViewDetails }) => {
  return (
    <div className="bg-white border-4 border-tantsaha-blue rounded-[30px] p-6 md:p-8 flex justify-between items-center mb-10 shadow-sm transition-all hover:bg-slate-50/50">
      <div className="flex flex-col">
        <p className="text-tantsaha-blue font-black uppercase text-xs tracking-[0.2em] mb-1">Anio</p>
        <div className="flex items-center gap-4">
          <h2 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter">
            {temp}°
          </h2>
          <i className={`fa-solid ${iconClass} text-4xl md:text-5xl text-tantsaha-blue drop-shadow-[0_2px_0_rgba(28,176,246,0.3)]`}></i>
        </div>
        <p className="text-slate-400 font-black uppercase text-[10px] md:text-xs mt-2 tracking-wider">
          {condition}
        </p>
      </div>
      <Button 
        label="Hijery" 
        icon="fa-arrow-right" 
        onClick={onViewDetails}
        className="px-8"
      />
    </div>
  );
};

export default MeteoWidget;