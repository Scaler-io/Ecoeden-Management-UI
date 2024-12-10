import {FormGroup, Validators} from '@angular/forms';
import {BaseFormGroupHelper} from './base-formgroup';
import {PhoneNumberValidator} from '../validators/phonenumber.validator';

export class SupplierFormGroupHelper extends BaseFormGroupHelper {
  public static createSupplierFormGroup(): FormGroup {
    const res = this.fb.group({
      supplierName: ['', [Validators.required]],
      supplierEmail: ['', [Validators.required, Validators.email]],
      supplierPhone: ['', [Validators.required, PhoneNumberValidator]],
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
