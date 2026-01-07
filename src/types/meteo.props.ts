export interface MeteoProps {
  temp: number;
  condition: string;
  iconClass: string;
  onViewDetails: () => void;
}