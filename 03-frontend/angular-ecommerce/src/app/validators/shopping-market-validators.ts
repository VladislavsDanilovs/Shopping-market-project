import { FormControl, ValidationErrors } from "@angular/forms";

export class ShoppingMarketValidators {

    // whitespace validation
    static notOnlyWhitespace(control: FormControl): ValidationErrors {

        // check if string only contains whitespace
        if ((control.value != null) && (control.value.trim().length === 0)) {
            
            // invalid, return error object
            return {'notOnlyWhitespace' : true};
            // Validation error key, the HTML template will check for this error key
        } 
         else {
             // valid, return null
            return null;
         }
        
    }
}
