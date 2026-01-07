import type { EntryProps } from "../../types/entry.props";

const EntryCard: React.FC<EntryProps> = ({ title, madLabel, details, date, icon, colorClass }) => {
  return (
    <div className="bg-white border-2 border-slate-200 border-b-8 rounded-[30px] p-5 flex gap-4 items-center transition-all active:border-b-2 active:translate-y-1 cursor-pointer mb-4 group">
      <div className={`${colorClass} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shrink-0`}>
        <i className={`fa-solid ${icon} drop-shadow-md`}></i>
      </div>
      <div className="flex-1">
        <h4 className="font-black text-slate-800 text-lg uppercase tracking-tight">{title}</h4>
        <p className="text-tantsaha-green font-black text-sm">{madLabel}</p>
        <p className="text-slate-500 text-xs font-bold mt-1 mb-3">{details}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-tighter">
            <i className="fa-regular fa-calendar-alt mr-1"></i> {date}
          </span>
          <button className="text-tantsaha-blue text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:underline">
            <i className="fa-solid fa-volume-high"></i> Hihaino
          </button>
        </div>
      </div>
      <div className="text-slate-300 group-hover:text-tantsaha-green transition-colors pl-2">
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  );
};

export default EntryCard;