import { CurrencyPipe } from '@angular/common';
import { Injectable, ɵisObservable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Furniture } from '../shared/models/Furniture';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubJect: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(furniture:Furniture):void{
    let cartItem = this.cart.items
    .find(item => item.furniture.id === furniture.id)
    if (cartItem)
    return;

    this.cart.items.push(new CartItem(furniture));
    this.setCartToLocalStorage();
  }

  removeFromCart(furnitureId: string):void {
    this.cart.items = this.cart.items
    .filter(item => item.furniture.id != furnitureId);
    this.setCartToLocalStorage();
  }

  changeQuantity(furnitureId:string, quantity:number){
    let cartItem = this.cart.items.find(item => item.furniture.id === furnitureId);
    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.furniture.price;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

    getCartObservable():Observable<Cart>{
      return this.cartSubJect.asObservable();
    }

    private setCartToLocalStorage():void{
      this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
      this.cart.totalCount = this.cart.items
      .reduce((prevSum, currencyItem) => prevSum + currencyItem.quantity, 0);

      const cartJson = JSON.stringify(this.cart);
      localStorage.setItem('Cart', cartJson);
      this.cartSubJect.next(this.cart);
    }

    private getCartFromLocalStorage():Cart{
      const cartJson = localStorage.getItem('Cart');
      return cartJson? JSON.parse(cartJson): new Cart();
    }
}
