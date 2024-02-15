import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
  providers: [DatePipe]
})
export class OrderDetailComponent implements OnInit {
 orderIndex: string = '';
 order: any
 constructor(public route: ActivatedRoute, orderService:OrderService,private datePipe:DatePipe,loadingService: LoadingService) {
  route.params.subscribe((params) => {
    if(params.id) {
      loadingService.showLoading()
     orderService.getOrderById(params.id).subscribe(oneOrder => {
      if (oneOrder) {
        this.order  = oneOrder
        this.order.updatedAt = this.formatDate(this.order.updatedAt);
        setTimeout(() => {
          loadingService.hideLoading()
        },300)
      }
     })
    }
  })
 }
 ngOnInit(): void {

 }
 private formatDate(date: Date): string {
  // 'yyyy-MM-dd HH:mm' represents the desired format
  return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm') || '';
}
}
