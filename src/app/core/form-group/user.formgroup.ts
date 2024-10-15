import {FormGroup, Validators} from '@angular/forms';
import {BaseFormGroupHelper} from './base-formgroup';
import {PasswordMatchValidator, StrongPasswordCheck} from '../validators/password.validator';
import {DuplicateUserName} from '../validators/async-validators/username-async.validtor';
import {UserService} from '../services/user.service';

export class UserFormGroupHelper extends BaseFormGroupHelper {
  public static createUserFormGroup(userService: UserService, setLoading: (loading: boolean) => void): FormGroup {
    const formGroup = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(20)], [DuplicateUserName(userService, setLoading)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), StrongPasswordCheck]],
      confirmPassword: ['', [Validators.required, PasswordMatchValidator]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      roles: ['', [Validators.required]]
    });
    return formGroup;
  }

  public static createUserRoleUpdateFormGroup(): FormGroup {
    const formGroup = this.fb.group({
      roles: ['', Validators.required]
    });

    return formGroup;
  }
}
