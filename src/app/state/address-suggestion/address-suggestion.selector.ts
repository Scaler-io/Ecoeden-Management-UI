import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ADDRESS_SUGGESTION_STATE_NAME, AddressSuggestionState} from './address-suggestion.reducer';
import {AddressSuggestion} from 'src/app/core/models/address-suggestion';

const addressSuggestionState = createFeatureSelector<AddressSuggestionState>(ADDRESS_SUGGESTION_STATE_NAME);

export const getAddressSuggestions = createSelector(addressSuggestionState, state => {
  return <AddressSuggestion>{
    status: state?.suggestion?.status,
    regions: state?.suggestion?.regions
  };
});
