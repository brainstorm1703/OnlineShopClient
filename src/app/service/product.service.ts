import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const PRODUCT_API = 'http://localhost:8080/api/product/';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getAllProduct(): Observable<any> {
    return this.http.get(PRODUCT_API);
  }

  deleteProduct(id: number): Observable<any>{
    return this.http.post(PRODUCT_API + id + '/delete', null);
  }

  createdProduct(product: { quantity: any; price: any; name: string; description: any }): Observable<any> {
    return this.http.post(PRODUCT_API + 'create', product);
  }

  updateProduct(product: { name: any; price: any; quantity: any; description: any }, id: any): Observable<any> {
    console.log(id);
    return this.http.post(PRODUCT_API + id + '/update', product);
  }
}
