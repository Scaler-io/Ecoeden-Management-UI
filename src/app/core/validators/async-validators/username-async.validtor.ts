import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {debounceTime, distinctUntilChanged, map, switchMap, take} from 'rxjs';

export function DuplicateUserName(userService: UserService, setLoading: (loading: boolean) => void): AsyncValidatorFn {
  return (control: AbstractControl) => {
    setLoading(true);
    return control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      take(1),
      switchMap(() => {
        return userService.userNameExists(control?.value).pipe(
          map(value => {
            setLoading(false);
            return value ? {userNameExists: true} : null;
          })
        );
      })
    );
  };
}
