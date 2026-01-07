import { useState } from 'react';

const EntryModal = ({ isOpen, onClose, onSave }: any) => {
  const [formData, setFormData] = useState({
    title: '', madLabel: '', description: '', type: 'fambolena'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100 flex items-end md:items-center justify-center p-4">
      <form 
        onSubmit={(e) => { e.preventDefault(); onSave(formData); setFormData({title:'', madLabel:'', description:'', type:'fambolena'}); }}
        className="bg-white w-full max-w-md rounded-[35px] p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <h3 className="text-2xl font-black text-slate-800 uppercase mb-6">Asa vaovao</h3>
        <div className="space-y-4">
          <input required placeholder="Titre..." className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 font-bold outline-none" 
            onChange={e => setFormData({...formData, title: e.target.value})} />
          <input required placeholder="Anarany..." className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 font-bold outline-none" 
            onChange={e => setFormData({...formData, madLabel: e.target.value})} />
          <textarea placeholder="Fanazavana..." rows={3} className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 font-bold outline-none resize-none" 
            onChange={e => setFormData({...formData, description: e.target.value})} />
          <select className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 font-bold outline-none" 
            onChange={e => setFormData({...formData, type: e.target.value})}>
            <option value="fambolena">Fambolena</option>
            <option value="meteo">Toetr'andro</option>
            <option value="bibikely">Bibikely</option>
          </select>
        </div>
        <div className="flex gap-3 mt-8">
          <button type="button" onClick={onClose} className="flex-1 bg-slate-100 text-slate-400 font-black py-4 rounded-2xl uppercase text-[10px]">Hanafoana</button>
          <button type="submit" className="flex-2 bg-tantsaha-blue border-b-[6px] text-white font-black py-4 rounded-2xl uppercase text-[10px]">Tehirizina</button>
        </div>
      </form>
    </div>
  );
};

export default EntryModal;