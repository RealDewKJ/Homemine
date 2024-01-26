declare var Omise: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {
  order:Order = new Order();
  constructor(orderService: OrderService, router: Router){
    Omise.setPublicKey(environment.OMISE_PUBLIC_KEY);
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

    console.log(Omise)
  }
}