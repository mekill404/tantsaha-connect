export interface ButtonProps {
  label: string;
  onClick: () => void;
  icon?: string;
  colorClass?: string;
  borderClass?: string; 
  className?: string;
}