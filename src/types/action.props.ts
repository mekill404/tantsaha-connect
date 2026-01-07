export interface ActionCardProps {
  title: string;
  icon: string;
  colorClass: string;
  borderClass: string;
  badge?: number;
  onClick?: () => void; 
}