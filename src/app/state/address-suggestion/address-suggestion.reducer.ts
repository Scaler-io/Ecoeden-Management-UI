import * as addressSuggestionActtions from './address-suggestion.action';

import {AddressSuggestion} from 'src/app/core/models/address-suggestion';

export const ADDRESS_SUGGESTION_STATE_NAME = 'addressSuggestion';

export interface AddressSuggestionState {
  suggestion: AddressSuggestion;
}

const initialState: AddressSuggestionState = {
  suggestion: null
};

export function addressSuggestionReducer(
  state: AddressSuggestionState = initialState,
  action: addressSuggestionActtions.AddressSuggestionActions
): AddressSuggestionState {
  switch (action.type) {
    case addressSuggestionActtions.ADDRESS_SUGGESTION_FETCH:
      return {
        ...state,
        suggestion: null
      };
    case addressSuggestionActtions.ADDRESS_SUGGESTION_FETCH_SUCCESS:
      return {
        ...state,
        suggestion: action.payload as AddressSuggestion
      };
    case addressSuggestionActtions.ADDRESS_SUGGESTION_FETCH_FAILURE:
      return {
        ...state,
        suggestion: {
          ...state.suggestion,
          status: false,
          regions: []
        }
      };
    case addressSuggestionActtions.CLEAR_ADDRESS_SUGGESTION:
      return {
        ...state,
        suggestion: null
      };
    default:
      return state;
  }
}
