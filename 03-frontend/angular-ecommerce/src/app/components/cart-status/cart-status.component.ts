import { Component, OnInit } from '@angular/core';
import { LocalStorage, LocalStorageService, SessionStorage, SessionStorageService } from 'ngx-webstorage';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00;

  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.updateCartStatus();

  }
  updateCartStatus() {

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    
    // subscribe to tha cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

}