import type { PopupProps } from '../../types/popup.props';
import Button from '../layout/Button';

const Popup = ({ item, onClose, onDelete }: PopupProps) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-150 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-md rounded-[40px] p-6 shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]" 
        onClick={e => e.stopPropagation()}
      >
        {onDelete && (
          <button onClick={() => onDelete(item.id)} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 p-2">
            <i className="fa-solid fa-trash-can text-xl"></i>
          </button>
        )}
        <div className={`${item.colorClass || item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg mx-auto shrink-0`}>
          <i className={`fa-solid ${item.icon}`}></i>
        </div>
        
        <h3 className="text-xl font-black text-slate-800 text-center uppercase leading-tight mb-1 px-4">{item.title}</h3>
        <p className="text-tantsaha-green font-black text-center mb-6 uppercase text-[10px] tracking-widest">{item.madLabel}</p>
        
        <div className="bg-slate-50 rounded-3xl p-5 mb-6 border-2 border-slate-100 overflow-y-auto flex-1 min-h-0">
          <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b pb-1">Toromarika</h4>
          <div className="text-slate-700 font-bold leading-relaxed whitespace-pre-line text-sm text-justify">
            {item.content || item.description}
          </div>
        </div>
        <Button 
          label="Hikatona"
          onClick={onClose}
          className="w-full text-xs py-4 text-slate-500 shrink-0" 
          colorClass="bg-slate-100"
          borderClass="border-slate-200"
        />
      </div>
    </div>
  );
};

export default Popup;