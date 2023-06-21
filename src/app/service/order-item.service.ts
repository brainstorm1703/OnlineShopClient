import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/Order";
import {OrderItem} from "../models/OrderItem";
import {Product} from "../models/Product";


const ORDER_API = 'http://localhost:8080/api/order/';
const PRODUCT_API = 'http://localhost:8080/api/product/';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  constructor(private http: HttpClient) {
  }

  getAllOrderItem(id: number): Observable<any> {
    return this.http.get(ORDER_API + id);
  }

  deleteOrderItem(orderId: number, orderItem: { productID: any; orderID: any; quantity: any; amount: any}): Observable<any> {
    return this.http.post(ORDER_API + orderId + '/delete/' + orderItem.productID.id, orderItem);
  }

  updateOrderItem(orderItem: OrderItem, orderId: string) {
    return this.http.post(ORDER_API + orderId + '/updateItem', orderItem);
  }

  createItemOrder(orderItem: { productID: any; orderID: any; quantity: any; amount: any}, productId: number, orderId: number): Observable<any> {
    return this.http.post(PRODUCT_API + productId + '/add/' + orderId, orderItem);
  }
}
