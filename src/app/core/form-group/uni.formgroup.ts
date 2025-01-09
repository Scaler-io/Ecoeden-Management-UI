import {FormGroup, Validators} from '@angular/forms';
import {BaseFormGroupHelper} from './base-formgroup';

export class UnitFormGroupHelper extends BaseFormGroupHelper {
  public static createUnitFormGroup(): FormGroup {
    return this.fb.group({
      unitName: ['', [Validators.required]],
      status: [false]
    });
  }
}
