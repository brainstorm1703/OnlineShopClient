import {Product} from "./Product";
import {Order} from "./Order";

export interface OrderItem {
  productID: Product;
  orderID: Order;
  quantity: number;
  amount: number;
}
