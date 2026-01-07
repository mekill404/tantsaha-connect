import { useState, useEffect } from 'react';

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('L’utilisateur a installé l’app');
      setDeferredPrompt(null);
    }
  };

  if (isInstalled || !deferredPrompt) return null;

  return (
    <div className="px-5 mb-6">
      <button
        onClick={handleInstallClick}
        className="w-full bg-tantsaha-orange text-white border-b-4 border-tantsaha-orange-border px-6 py-4 rounded-[25px] font-black uppercase text-sm flex items-center justify-between shadow-lg active:border-b-0 active:translate-y-1 transition-all"
      >
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-download animate-bounce"></i>
          <span>Hametraka ny fampiharana</span>
        </div>
        <i className="fa-solid fa-chevron-right text-xs opacity-50"></i>
      </button>
      <p className="text-[10px] text-center mt-2 text-slate-400 font-bold uppercase tracking-wider">
        Mametraha an'i Tantsaha eo amin'ny findainao
      </p>
    </div>
  );
};

export default InstallButton;