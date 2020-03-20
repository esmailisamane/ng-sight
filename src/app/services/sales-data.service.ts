import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Order } from '../shared/order';

@Injectable({
  providedIn: 'root'
})
export class SalesDataService {

constructor(private http: HttpClient) { }


 getOrders(pageIndex: number, pageSize: number)  {
   return this.http.get<Order[]>('http://localhost:56603/api/orders/' + pageIndex + '/' + pageSize);
  }
}
