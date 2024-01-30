export interface Order {
  id: number;
  created_at: string;
  status: string;
  placed_by: number;
  totalSum: number;
}
