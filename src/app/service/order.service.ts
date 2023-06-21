import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/Order";

const ORDER_API = 'http://localhost:8080/api/order/';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrder(): Observable<any> {
    return this.http.get(ORDER_API);
  }

  deleteOrder(id: number): Observable<any>{
    return this.http.post(ORDER_API + id + '/delete', null);
  }

  createdOrder(order: { orderAddress: any; details: any}): Observable<any> {
    return this.http.post(ORDER_API + 'create', order );
  }

  updateOrderStatus(order: Order, id: number) {
    return this.http.post(ORDER_API + id + '/update', order);
  }
  updateOrder(order: Order, id: number) {
    return this.http.post(ORDER_API + id + '/update', order);
  }
}
