import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Navbar = () => {
  const { totalAlerts } = useApp();

  const menuItems = [
    { icon: 'fa-house', label: 'Fandraisana', path: '/fandraisana' },
    { icon: 'fa-cloud-rain', label: "Toetr'andro", path: '/toetr_andro' },
    { icon: 'fa-bell', label: 'Fanairana', path: '/fanairana', hasBadge: true },
    { icon: 'fa-book', label: 'Boky', path: '/boky' },
    { icon: 'fa-lightbulb', label: 'Torohevitra', path: '/torohevitra' },
  ];

  return (
    <nav className="w-full bg-white border-b-2 border-slate-200 sticky top-0 z-50">
      <div className="w-full flex justify-around">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `
              flex-1 flex flex-col items-center py-3 transition-all outline-none border-b-4 relative
              ${isActive 
                ? 'border-tantsaha-green text-tantsaha-green bg-slate-50' 
                : 'border-transparent text-slate-400 hover:bg-slate-50 hover:text-slate-600'}
            `}
          >
            <div className="relative">
              <i className={`fa-solid ${item.icon} text-xl md:text-2xl`}></i>
              {item.hasBadge && totalAlerts > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-sm">
                  {totalAlerts}
                </span>
              )}
            </div>
            <span className="hidden md:block text-[10px] font-black mt-1 uppercase tracking-tighter">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;