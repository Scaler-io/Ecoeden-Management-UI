import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupplierCreatePageComponent} from './supplier-create-page.component';
import {DividerModule} from 'src/app/shared/components/divider/divider.module';
import {AppMaterialModule} from 'src/app/app-material.module';
import {ButtonModule} from 'src/app/shared/components/button/button.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {ADDRESS_SUGGESTION_STATE_NAME, addressSuggestionReducer} from 'src/app/state/address-suggestion/address-suggestion.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AddressSuggestionEffect} from 'src/app/state/address-suggestion/address-suggestion.effect';
import {DirectiveModule} from 'src/app/shared/directives/directive/directive.module';

@NgModule({
  declarations: [SupplierCreatePageComponent],
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
  exports: [SupplierCreatePageComponent]
})
export class SupplierCreatePageModule {}
