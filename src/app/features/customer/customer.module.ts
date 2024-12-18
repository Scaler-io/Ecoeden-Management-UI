import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerComponent} from './customer.component';
import {CustomerRoutingModule} from './customer-routing.module';
import {StoreModule} from '@ngrx/store';
import {CUSTOMER_STATE_NAME, customerReducer} from 'src/app/state/customer/customer.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CustomerEffect} from 'src/app/state/customer/customer.effect';

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    StoreModule.forFeature(CUSTOMER_STATE_NAME, customerReducer),
    EffectsModule.forFeature([CustomerEffect])
  ]
})
export class CustomerModule {}
