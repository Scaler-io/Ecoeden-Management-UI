import {AbstractControl, FormGroup} from '@angular/forms';

export function PasswordMatchValidator(control: AbstractControl): {[key: string]: boolean} | null {
  const parent = control.parent as FormGroup;
  if (control?.value !== parent?.get('password').value) {
    return {'password-mismatch': true};
  }
  return null;
}

export function StrongPasswordCheck(control: AbstractControl): {[key: string]: boolean} | null {
  const pattern = /(?=^.{6,15}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
  if (!pattern.test(control?.value)) {
    return {pattern: true};
  }
  return null;
}
