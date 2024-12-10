import {Action} from '@ngrx/store';
import {AddressSuggestion} from 'src/app/core/models/address-suggestion';

export const ADDRESS_SUGGESTION_FETCH = 'ADDRESS_SUGGESTION_FETCH';
export const ADDRESS_SUGGESTION_FETCH_SUCCESS = 'ADDRESS_SUGGESTION_FETCH_SUCCESS';
export const ADDRESS_SUGGESTION_FETCH_FAILURE = 'ADDRESS_SUGGESTION_FETCH_FAILURE';
export const CLEAR_ADDRESS_SUGGESTION = 'CLEAR_ADDRESS_SUGGESTION';

export class AddressSuggestionFetch implements Action {
  type: string = ADDRESS_SUGGESTION_FETCH;
  constructor(public payload: string) {}
}

export class AddressSuggestionFetchSuccess implements Action {
  type: string = ADDRESS_SUGGESTION_FETCH_SUCCESS;
  constructor(public payload: AddressSuggestion) {}
}

export class AddressSuggestionFetchFailure implements Action {
  type: string = ADDRESS_SUGGESTION_FETCH_FAILURE;
  constructor(public payload: any) {}
}

export class ClearAddressSuggestion implements Action {
  type: string = CLEAR_ADDRESS_SUGGESTION;
  constructor(public payload?: any) {}
}

export type AddressSuggestionActions =
  | AddressSuggestionFetch
  | AddressSuggestionFetchSuccess
  | AddressSuggestionFetchFailure
  | ClearAddressSuggestion;
