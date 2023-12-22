import { Furniture } from "./Furniture";

export class CartItem{
constructor(public furniture:Furniture){ }
  quantity :number = 1 ;
  price: number = this.furniture.price;
}
