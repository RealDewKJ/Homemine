import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { HttpClient } from '@angular/common/http';
import { GET_ORDER_BY_ID, ORDER_BY_ID_URL, ORDER_CRATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_URL, PLACEORDER_URL, httpOptions } from '../shared/constants/urls';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
declare var Omise: any;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient,) {
    this.initializeOmise();
   }

   private initializeOmise() {
    Omise.setPublicKey(environment.OMISE_PUBLIC_KEY);
  }

  create (order: Order) {
    return this.http.post<Order>(ORDER_CRATE_URL, order, httpOptions)
  }

  getNewOrderForCurrentUser(): Observable<Order> {
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL)
  }

  getOrderByOrderId(orderId: string): Observable<any> {
    return this.http.get<any>(`${ORDER_URL}/getId/${orderId}`);
  }

  getOmiseInstance(): any {
    return Omise;
  }

  createSorce(amount:any, code:string) {
    return new Promise((resolve:any, reject:any) => {
      Omise.createSource(code, {
        amount: (amount * 100),
        currency: 'THB'
      }, (statusCode:any, response:any) => {
        if (statusCode !== 200) {
          return reject(response)
        }
        // console.log(response)
        resolve(response)
      }
      )
    })
  }
  placeOrder(order: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>('http://localhost:5000/api/orders/placeOrder', order, httpOptions)
        .subscribe({
          next: data => {
            resolve(data);  // Resolve the Promise with the data
          },
          error: error => {
            console.error(error);
            reject(error);  // Reject the Promise with the error
          },
        });
    });
  }
  getOrder():Observable<any>{
    return this.http.get<any>(ORDER_URL)
  }

  getOrderById(orderId: string):Observable<any>{
    return this.http.get<any>(ORDER_BY_ID_URL + orderId)
  }
}
