import {AbstractControl} from '@angular/forms';

export function PhoneNumberValidator(control: AbstractControl): {[key: string]: boolean} | null {
  const validPhoneInitials = ['6', '7', '8', '9'];
  if (control?.value?.length !== 10 || !validPhoneInitials.some(initial => (control?.value as string).startsWith(initial))) {
    return {'phone-invalid': true};
  }
  return null;
}
