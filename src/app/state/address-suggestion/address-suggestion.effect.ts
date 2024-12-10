import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, Observable, of, switchMap} from 'rxjs';
import {PostcodeValidationService} from 'src/app/core/services/postcode-validation.service';

import * as addressSuggestionActions from './address-suggestion.action';
import {Action} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AddressSuggestionEffect {
  constructor(
    private postcodeValidationService: PostcodeValidationService,
    private $actions: Actions
  ) {}

  public $fetchAddressSuggestion: Observable<Action> = createEffect(() => {
    return this.$actions.pipe(
      ofType(addressSuggestionActions.ADDRESS_SUGGESTION_FETCH),
      switchMap((action: addressSuggestionActions.AddressSuggestionFetch) => {
        return this.postcodeValidationService.getAddressSuggestion(action.payload).pipe(
          map(res => new addressSuggestionActions.AddressSuggestionFetchSuccess(res)),
          catchError(error => {
            return of(new addressSuggestionActions.AddressSuggestionFetchFailure(error));
          })
        );
      })
    );
  });
}
