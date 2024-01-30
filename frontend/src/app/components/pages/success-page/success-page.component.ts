import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'success-page',
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.css',
  providers: [DatePipe],
})
export class SuccessPageComponent implements OnInit {
  order:Order = new Order();
  orderId!: string
  formattedDate!: string;
  constructor(private orderService: OrderService, router: Router,private route: ActivatedRoute,private datePipe:DatePipe){
    this.route.queryParams.subscribe(params => {
      this.orderId = params['order'];
      this.orderService.getOrderByOrderId(this.orderId).subscribe({
        next: (order) => {
          this.order = order;
          this.order.createdAt = this.formatDate(order.createdAt);
          console.log(this.order)
        },
        error: (error) => {
          console.log(error)
          // router.navigateByUrl('/checkout')
        }
      })
    });

  }

 ngOnInit(): void {

 }
 private formatDate(date: Date): string {
  // 'yyyy-MM-dd HH:mm' represents the desired format
  return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm') || '';
}
}
