export interface PopupProps {
  item: any; 
  onClose: () => void;
  onDelete?: (id: number) => void;
}