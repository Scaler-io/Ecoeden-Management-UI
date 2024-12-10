import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SuppliersRoutingModule} from './suppliers-routing.module';
import {SuppliersComponent} from './suppliers.component';
import {StoreModule} from '@ngrx/store';
import {SUPPLIER_STATE_NAME, supplieReducer} from 'src/app/state/supplier/supplier.reducer';
import {EffectsModule} from '@ngrx/effects';
import {SupplierEffect} from 'src/app/state/supplier/supplier.effect';
import {AppMaterialModule} from 'src/app/app-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchLayoutModule} from 'src/app/shared/components/search-layout/search-layout.module';
import {TableModule} from 'src/app/shared/components/table/table.module';
import {SupplierListMobileModule} from './supplier-list-mobile/supplier-list-mobile.module';
import {SupplierDetailedViewModule} from './supplier-detailed-view/supplier-detailed-view.module';
import {SupplierUpsertPageModule} from './supplier-upsert-page/supplier-upsert-page.module';

@NgModule({
  declarations: [SuppliersComponent],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    EffectsModule.forFeature([SupplierEffect]),
    StoreModule.forFeature(SUPPLIER_STATE_NAME, supplieReducer),
    ReactiveFormsModule,
    SearchLayoutModule,
    TableModule,
    SupplierUpsertPageModule,
    SupplierDetailedViewModule,
    AppMaterialModule,
    SupplierListMobileModule
  ]
})
export class SuppliersModule {}
