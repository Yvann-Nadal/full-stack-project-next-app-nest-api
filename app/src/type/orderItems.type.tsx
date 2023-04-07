import { Order } from "./orders.type";
import { Product } from "./products.type";

export interface OrderItem {
  id: number;
  quantity: number;
  product: Product;
  order: Order;
}
