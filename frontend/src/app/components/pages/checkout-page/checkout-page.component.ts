import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
  providers: [MessageService]
})
export class CheckoutPageComponent implements OnInit  {
  order:Order = new Order();
  checkoutForm!: FormGroup;
  constructor(cartService: CartService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private messageService: MessageService) {
                const cart = cartService.getCart()
                this.order.items = cart.items
                this.order.totalPrice = cart.totalPrice
  }
  ngOnInit(): void {
    let {name, address} = this.userService.userValue;
    this.checkoutForm = this.formBuilder.group({
      name:[name, Validators.required],
      address:[address, Validators.required]
    });
  }

  get fc() {
    return this.checkoutForm.controls
  }

  createOrder(){
    if (this.checkoutForm.invalid) {
      this.messageService.add({
        severity: 'warning',
        summary: 'Warning',
        detail: 'Please fill the inputs',
      });
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    console.log(this.order)
  }
}
