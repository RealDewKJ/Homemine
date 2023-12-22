import { CartItem } from "./CartItem";

export class Cart{
  items:CartItem[] = [];
  //new Cart() undefined {}
  totalPrice:number = 0;
  totalCount:number = 0;
}
