import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import { MessageService } from 'primeng/api';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  providers: [MessageService]
})
export class CheckoutPageComponent implements OnInit  {
  order:Order = new Order();
  checkoutForm!: FormGroup;
  constructor(cartService: CartService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private messageService: MessageService,
              private orderService: OrderService,
              private router: Router) {
                const cart = cartService.getCart()
                if (cart.totalPrice ===  0) {
                   router.navigateByUrl('/cart-page')
                }
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
        severity: 'warn',
        summary: 'Warn',
        detail: 'Please fill the inputs',
      });
      return;
    }
    if(!this.order.addressLatLng) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Please select your location on the map',
      })
      return
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;
    this.orderService.create(this.order).subscribe({
      next:(order) => {
        this.router.navigateByUrl('payment')
      },
      error:(errorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'danger'
        })
      }
    })


  }
}
