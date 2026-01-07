import Button from '../layout/Button';

const ConseilCard = ({ item, onPlay, onRead, isPlaying }: any) => (
  <div className={`bg-white border-2 border-b-8 rounded-[30px] p-5 transition-all duration-300 ${isPlaying ? 'border-tantsaha-blue ring-4 ring-tantsaha-blue/10 -translate-y-1' : 'border-slate-200'}`}>
    <div className="flex gap-4">
      <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl shrink-0 relative shadow-lg`}>
        <i className={`fa-solid ${isPlaying ? 'fa-waveform animate-pulse' : item.icon}`}></i>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-black text-slate-800 uppercase text-[11px] leading-tight">
            {item.title}
          </h4>
          {isPlaying && (
            <span className="bg-tantsaha-blue text-white text-[8px] px-2 py-0.5 rounded-full font-black animate-bounce uppercase">
              Mandeha...
            </span>
          )}
        </div>
        
        <p className="text-slate-500 text-[10px] font-medium mb-4 line-clamp-1">
          {item.madLabel}
        </p>

        <div className="flex gap-2">
          <Button 
            label={isPlaying ? "Stop" : "Hihaino"}
            icon={isPlaying ? "fa-stop" : "fa-play"}
            onClick={onPlay}
            className="flex-1 text-[9px] py-2 px-0"
            colorClass={isPlaying ? "bg-slate-800" : "bg-tantsaha-blue"}
            borderClass={isPlaying ? "border-slate-900" : "border-tantsaha-blue-border"}
          />
          <Button 
            label="Mahery"
            icon="fa-book-open"
            onClick={onRead}
            className="flex-1 text-[9px] py-2 px-0 text-black"
            colorClass="bg-tantsaha-green"
            borderClass="border-slate-200"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ConseilCard;