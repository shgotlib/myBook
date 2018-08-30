import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrdersService {

  public API = 'http://localhost:8080';
  public ORDER_API = this.API + '/bookOrders';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/all-orders');
  }

  get(id: string) {
    return this.http.get(this.ORDER_API + '/' + id);
  }

  save(order: any): Observable<any> {
    let result: Observable<Object>;
    if (order['href']) {
      result = this.http.put(order.href, order);
    } else {
      result = this.http.post(this.ORDER_API, order);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
