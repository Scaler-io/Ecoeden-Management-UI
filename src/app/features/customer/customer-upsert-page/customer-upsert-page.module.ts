import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerUpsertPageComponent} from './customer-upsert-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AppMaterialModule} from 'src/app/app-material.module';
import {ButtonModule} from 'src/app/shared/components/button/button.module';
import {DividerModule} from 'src/app/shared/components/divider/divider.module';
import {DirectiveModule} from 'src/app/shared/directives/directive/directive.module';
import {AddressSuggestionEffect} from 'src/app/state/address-suggestion/address-suggestion.effect';
import {ADDRESS_SUGGESTION_STATE_NAME, addressSuggestionReducer} from 'src/app/state/address-suggestion/address-suggestion.reducer';

@NgModule({
  declarations: [CustomerUpsertPageComponent],
  imports: [
    CommonModule,
    DividerModule,
    AppMaterialModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(ADDRESS_SUGGESTION_STATE_NAME, addressSuggestionReducer),
    EffectsModule.forFeature([AddressSuggestionEffect]),
    DirectiveModule
  ],
  exports: [CustomerUpsertPageComponent]
})
export class CustomerUpsertPageModule {}
