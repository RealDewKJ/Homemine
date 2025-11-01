import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';


@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html'
})
export class PaymentPageComponent implements OnInit {
  order:Order = new Order();
  constructor(private orderService: OrderService, router: Router){
    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error: (error) => {
        console.log(error)
        router.navigateByUrl('/checkout')
      }
    })
  }

  ngOnInit(): void {
  }
}
