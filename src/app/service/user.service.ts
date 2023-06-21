import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const USER_API = 'http://localhost:8080/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<any> {
    return this.http.get(USER_API + 'all');
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(USER_API);
  }

  getRole(): Observable<any>{
    return this.http.get(USER_API + 'role');
  }

  deleteUser(id: number): Observable<any>{
    return this.http.post(USER_API + id + '/delete', null);
  }
}
