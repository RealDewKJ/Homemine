import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  providers: [DatePipe]
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
 constructor(private orderService: OrderService,private datePipe:DatePipe,loadingService: LoadingService){
  orderService.getOrder().subscribe({
    next: (order) => {
      if(order) {
        loadingService.showLoading()
        this.orders = order
        this.orders.forEach((order:any) => {
          order.updatedAt = this.formatDate(order.updatedAt);
        })
        setTimeout(() => {
          loadingService.hideLoading()
        },300)
      }
    }, error(err) {
      console.error('Error fetching Order:', err);
    },
  })
 }

 ngOnInit(): void {

 }
 private formatDate(date: Date): string {
  // 'yyyy-MM-dd HH:mm' represents the desired format
  return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm') || '';
}
}
