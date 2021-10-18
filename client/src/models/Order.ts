export type Order = {
  id: string;
  username: string;
  quantity: number;
  date: Date;
};

type Error = {
  [key: string]: boolean;
};

export type OrdersState = {
  orders: Order[];
  quantity: number;
  errors: Error[];
};
