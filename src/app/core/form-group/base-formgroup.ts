import {FormBuilder, FormGroup} from '@angular/forms';

export class BaseFormGroupHelper {
  public static fb: FormBuilder = new FormBuilder();

  public static getChildForm(parent: FormGroup, child: string) {
    return parent?.get(child) as FormGroup;
  }
}
