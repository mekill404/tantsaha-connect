import type { ButtonProps } from "../../types/button.props";

const Button: React.FC<ButtonProps> = ({ 
  label, onClick, icon, 
  colorClass = "bg-tantsaha-blue", 
  borderClass = "border-tantsaha-blue-border",
  className = "" 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`${colorClass} ${borderClass} ${className} border-b-4 active:border-b-0 active:translate-y-1 rounded-2xl font-black uppercase flex items-center justify-center gap-2 transition-all text-white`}
    >
      {icon && <i className={`fa-solid ${icon}`}></i>}
      {label}
    </button>
  );
};

export default Button