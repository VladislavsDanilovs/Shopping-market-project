import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[];

  /* Subject is a sublacc of Observable.
  We can use Subject to publish event in our code.
  The event will be sent to ALL of the subscribers */

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  totalShippingPrice: Subject<number> = new Subject<number>();

  /*

  cartItems uses the constructor to initialises the cartItems variable.

  If there is a value in the sessionStorage cartItems value we initialise with that value, otherwise we initialise to an empty array.

  The reason for JSON.parse is sessionStorage and localStorage store strings. So we need to convert the string back into a javascript object equivalent (json).

  */
  constructor() {
    this.cartItems = JSON.parse(sessionStorage.getItem('cartItems')!) ? JSON.parse(sessionStorage.getItem('cartItems')!) : [];
  }

  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;


    if (this.cartItems.length > 0) {

      //  find the item in the cart based on item id

      // for(let tempCartItem of this.cartItems){
      //   if(tempCartItem.id === theCartItem.id){
      //     existingCartItem = tempCartItem;
      //     break;
      //   }
      // }

      // refactored code. Returns first element that passes, else returns undefined.
      existingCartItem = this.cartItems.find(tempCartItem => (tempCartItem.id === theCartItem.id));

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      //increment the quantity
      existingCartItem!.quantity++;
    }
    else {
      // add the item to the array
      this.cartItems.push(theCartItem);
    }

    //compute cart total price and total quantity
    this.computeCartTotals();

  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    let totalShippingPrice: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    totalShippingPrice = 0.05 * totalPriceValue;

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.totalShippingPrice.next(totalShippingPrice);

    //log cart data for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue, totalShippingPrice);
    this.cartItemsInSessionStorage();
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number, totalShippingPrice: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {

      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;

      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, 
      unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }
    //toFixed(2) means two digits after decimal (124.98)
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}, totalShippingPrice: ${totalShippingPrice.toFixed(2)}`);
    console.log('-----');
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.removeItemsFromCart(cartItem);
    }
    else {
      this.computeCartTotals();
    }

  }

  removeItemsFromCart(cartItem: CartItem) {

    // get the index of item in the array
    const itemIndex = this.cartItems.findIndex(
    tempCartItem => tempCartItem.id === cartItem.id);

    // if found, remove the item from the array at the given index. If it would not find it then index will be -1.
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }
  
/*
Sets the sessionStorage cartItems value with the currentItems variable value.
The reason for JSON.stringify is sessionStorage and localStorage store strings. So this allows us to convert our array into a string equivalent.
*/
  cartItemsInSessionStorage() {
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
