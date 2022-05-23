import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartItem } from 'src/app/common/cart-item';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { ShoppingMarketFormService } from 'src/app/services/shopping-market-form.service';
import { ShoppingMarketValidators } from 'src/app/validators/shopping-market-validators';

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
        firstName: new FormControl('', 
            [Validators.required, 
            Validators.minLength(2), 
            ShoppingMarketValidators.notOnlyWhitespace]),

        lastName:  new FormControl('', 
            [Validators.required, 
            Validators.minLength(2), 
            ShoppingMarketValidators.notOnlyWhitespace]),

        email: new FormControl('', [Validators.required, 
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
        /*
        ^[a-z0-9._%+-] - match any combination of letters and digits, optional period
        [a-z0-9.-]+\\ - match any combination of letters and digits, with period
        [a-z]{2,4}$ - domain extension 2-4 letters

        more info - http://regextutorials.com/
        */
      }),
      shippingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required, Validators.minLength(2), 
                                      ShoppingMarketValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), 
                                      ShoppingMarketValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), 
                                      ShoppingMarketValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required, Validators.minLength(2), 
                                      ShoppingMarketValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), 
                                      ShoppingMarketValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), 
                                      ShoppingMarketValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), 
                                        ShoppingMarketValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
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

    this.listCartDetails();
  }

  // Getters for Customer section
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  // Getters for ShippingAdress section
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }

  // Getters for BillingAdress section
  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
    
  // Getters for CreditCard section
  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }


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
    
    // Since we are using behaviour subject we dont need compute method
    // this.cartService.computeCartTotals();
  }

  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      // Touching all fields triggers the display of the error messages
    }

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
