import {FormGroup, Validators} from '@angular/forms';
import {BaseFormGroupHelper} from './base-formgroup';
import {PhoneNumberValidator} from '../validators/phonenumber.validator';

export class CustomerFormGroupHelper extends BaseFormGroupHelper {
  public static createCustomerFormGroup(): FormGroup {
    const res = this.fb.group({
      customerName: ['', [Validators.required]],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', [Validators.required, PhoneNumberValidator]],
      streetNumber: ['', [Validators.required]],
      streetName: ['', [Validators.required]],
      streetType: ['', [Validators.required]],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postCode: ['', [Validators.required]],
      status: [false]
    });

    return res;
  }
}
