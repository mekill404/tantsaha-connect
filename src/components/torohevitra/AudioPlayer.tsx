const AudioPlayer = ({ item, isPlaying, onToggle, onClose }: any) => (
  <div className="fixed bottom-24 left-4 right-4 z-100 animate-in slide-in-from-bottom-10 duration-300">
    <div className="bg-slate-900 rounded-[30px] p-4 shadow-2xl border-t-4 border-tantsaha-blue">
      <div className="flex items-center gap-4">
        <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-inner`}>
          <i className={`fa-solid ${item.icon}`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <p className="text-white font-black text-[10px] uppercase truncate pr-4">{item.madLabel}</p>
            <button onClick={onClose} className="text-slate-500"><i className="fa-solid fa-xmark"></i></button>
          </div>
          <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-tantsaha-blue w-1/3 rounded-full relative"></div>
          </div>
        </div>
        <button onClick={onToggle} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 text-xl shadow-lg">
          <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play ml-1'}`}></i>
        </button>
      </div>
    </div>
  </div>
);

export default AudioPlayer;