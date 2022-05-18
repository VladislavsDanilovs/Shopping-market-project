import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartItem } from 'src/app/common/cart-item';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
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

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

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

    // populate countries
    this.shoppingMarketFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    )

    // populate states
    // this.shoppingMarketFormService.getStates(this.theCountryCode).subscribe(
    //   data => {
    //     console.log("Retrieved states: " + JSON.stringify(data));
    //     this.states = data;
    //   }
    // )

    this.listCartDetails();
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      
        //bug fix for states
        this.billingAddressStates = this.shippingAddressStates;
      }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

        //bug fix for states
      this.billingAddressStates = [];
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
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log("The email address is" + this.checkoutFormGroup.get('customer')!.value.email);
    console.log("The shipping address country is" + this.checkoutFormGroup.get('shippingAddres')!.value.country.name);
    console.log("The shipping address state is" + this.checkoutFormGroup.get('shippingAddres')!.value.state.name);

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

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName)

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.shoppingMarketFormService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
            this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup?.get('state')?.setValue(data[0]);
      }
    );

  }

}
