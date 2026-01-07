import type { CategoryProps } from "../../types/category.props";

const CategoryFilter = ({ activeTab, onSelect }: CategoryProps) => {
  const categories = [
    { id: 'rehetra', mad: 'Rehetra', fr: 'Tous', icon: 'fa-lightbulb', color: 'bg-tantsaha-yellow' },
    { id: 'bibikely', mad: 'Bibikely', fr: 'Parasites', icon: 'fa-bug', color: 'bg-red-500' },
    { id: 'rano', mad: 'Rano', fr: 'Eau', icon: 'fa-droplet', color: 'bg-tantsaha-blue' },
    { id: 'fambolena', mad: 'Fambolena', fr: 'Plantation', icon: 'fa-seedling', color: 'bg-tantsaha-green' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`p-4 rounded-[25px] border-2 border-b-8 transition-all flex flex-col items-center gap-2
            ${activeTab === cat.id 
              ? `${cat.color} border-black/10 text-white -translate-y-1 border-b-4` 
              : 'bg-white border-slate-200 text-slate-400 active:border-b-2'}`}
        >
          <i className={`fa-solid ${cat.icon} text-xl`}></i>
          <p className="text-xs font-black">{cat.mad}</p>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;