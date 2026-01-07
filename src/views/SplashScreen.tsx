const SplashScreen = () => (
  <div className="fixed inset-0 bg-tantsaha-green z-100 flex flex-col items-center justify-center text-white animate-pulse">
    <div className="relative">
      <div className="w-24 h-24 bg-white rounded-[30px] flex items-center justify-center shadow-2xl animate-bounce">
        <i className="fa-solid fa-leaf text-tantsaha-green text-5xl"></i>
      </div>
    </div>
    <h1 className="mt-6 text-2xl font-black uppercase tracking-[0.3em]">Tantsaha</h1>
    <p className="text-[10px] font-bold opacity-60 uppercase mt-2 tracking-widest text-center">
      Mamboly milamina ny Malagasy
    </p>
  </div>
);
export default SplashScreen