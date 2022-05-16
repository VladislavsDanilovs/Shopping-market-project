import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ShoppingMarketFormService } from 'src/app/services/shopping-market-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  cartItems: CartItem[] = [];
  
  totalPrice: number = 0;
  totalQuantity: number = 0;
  shippingPrice: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private shoppingMarketFormService: ShoppingMarketFormService) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    // populate credit card months

    //get the current month 0 - based, that why + 1 (to be 1 - 12, not 0 - 11)
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMotn: " + startMonth)

    this.shoppingMarketFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // populate credit card years
    this.shoppingMarketFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    )

    this.listCartDetails();
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;
 
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
 
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.totalShippingPrice.subscribe(
      data => this.shippingPrice = data
    );
 
    this.cartService.computeCartTotals();
  }

  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')!.value)
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup!.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth =  new Date().getMonth() + 1;
    }
     else {
       startMonth = 1;
     }
     this.shoppingMarketFormService.getCreditCardMonths(startMonth).subscribe(
       data => {
         console.log('Retrieved credit card Months: '+ JSON.stringify(data));
         this.creditCardMonths = data;
       }
     )
  }

}
