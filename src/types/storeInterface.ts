export interface Store {
  store_id: number;
  store_name: string;
  store_code: number;
  store_category: string;
  location: string;
}
export interface StoreListProps {
  stores: Store[];
  user: string | null;
  showLocation?: boolean;
}
