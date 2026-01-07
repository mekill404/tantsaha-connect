import Button from '../layout/Button';

const ConseilCard = ({ item, onPlay, onRead }: any) => (
  <div className="bg-white border-2 border-slate-200 border-b-8 rounded-[30px] p-5 active:border-b-2 active:translate-y-1 transition-all">
    <div className="flex gap-4">
      <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl shrink-0 shadow-md`}>
        <i className={`fa-solid ${item.icon}`}></i>
      </div>
      <div className="flex-1">
        <h4 className="font-black text-slate-800 uppercase text-xs leading-tight mb-1">
          {item.title}
        </h4>
        <p className="text-slate-500 text-[11px] font-medium mb-4">
          {item.madLabel}
        </p>
        <div className="flex gap-2">
          <Button 
            label="Hihaino"
            icon="fa-headphones"
            onClick={() => onPlay(item)}
            className="flex-1 text-[10px] py-2 px-0" 
            colorClass="bg-tantsaha-blue"
            borderClass="border-tantsaha-blue-border"
          />
          
          <Button 
            label="Vakio"
            icon="fa-book-open"
            onClick={() => onRead(item)}
            className="flex-1 text-[10px] py-2 px-0 text-white" 
            colorClass="bg-tantsaha-green"
            borderClass="border-tantsaha-green-border"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ConseilCard;