import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';
interface Payment {
  name: string;
  code: string;
}

@Component({
  selector: 'payment-button',
  templateUrl: './payment-button.component.html',
  styleUrl: './payment-button.component.css'
})
export class PaymentButtonComponent implements OnInit  {
order? = Order
payments: Payment[] | undefined;
selectedCity: Payment | undefined;
constructor() {

}

ngOnInit(): void {
  this.payments = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];
}

selectedDay(payment:{name: string, code: string}) {
  console.log(payment)
}
}
