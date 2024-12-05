import {FormGroup} from '@angular/forms';

interface ValidationMessage {
  error: string;
  formControlName?: string[] | string | null;
  message: string;
}

export const validationMessages: ValidationMessage[] = [
  {error: 'required', formControlName: ['userName'], message: 'Please enter a valid username'},
  {error: 'userNameExists', formControlName: ['userName'], message: 'This username is already taken'},
  {error: 'maxlength', formControlName: ['userName'], message: 'Username should not exceed 20 characters'},
  {error: 'required', formControlName: ['password'], message: 'Please enter a password'},
  {error: 'minlength', formControlName: ['password'], message: 'Password length should be between 6 and 20 characters'},
  {error: 'maxlength', formControlName: ['password'], message: 'Password length should be between 6 and 20 characters'},
  {error: 'pattern', formControlName: ['password'], message: 'Password did not match our password policy'},
  {error: 'required', formControlName: ['confirmPassword'], message: 'Please re-enter your password'},
  {error: 'password-mismatch', formControlName: ['confirmPassword'], message: 'Password did not match'},
  {error: 'required', formControlName: ['firstName'], message: 'Please enter a first name'},
  {error: 'required', formControlName: ['lastName'], message: 'Please enter a last name'},
  {error: 'required', formControlName: ['email'], message: 'Please enter a valid email'},
  {error: 'required', formControlName: ['roles'], message: 'Please select at least one role'},
  {error: 'required', formControlName: ['supplierName'], message: 'Please enter a valid supplier name'},
  {error: 'required', formControlName: ['supplierEmail'], message: 'Please enter a supplier email'},
  {error: 'email', formControlName: ['supplierEmail'], message: 'Please enter a valid email'},
  {error: 'required', formControlName: ['supplierPhone'], message: 'Please enter a supplier phone number'},
  {error: 'phone-invalid', formControlName: ['supplierPhone'], message: 'Please enter a valid phone number'},
  {error: 'required', formControlName: ['streetName'], message: 'Please enter a street name'},
  {error: 'required', formControlName: ['streetNumber'], message: 'Please eneter a street number'},
  {error: 'required', formControlName: ['streetType'], message: 'Please select a street type'},
  {error: 'required', formControlName: ['city'], message: 'No city has been selected'},
  {error: 'required', formControlName: ['district'], message: 'No district has been selected'},
  {error: 'required', formControlName: ['state'], message: 'No state has been selected'},
  {error: 'required', formControlName: ['postCode'], message: 'Please enter a valid postcode'}
];

export function validationMessage(formControl: string, formGroup: FormGroup): string {
  if (formGroup && formGroup.get(formControl)) {
    for (const error of validationMessages) {
      if (
        !error.formControlName ||
        error.formControlName.length === 0 ||
        (error.formControlName.includes(formControl) && formGroup.get(formControl).hasError(error.error))
      ) {
        return error.message;
      }
    }
  }

  return null;
}
