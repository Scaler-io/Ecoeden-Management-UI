import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitsComponent} from './units.component';
import {UnitsRoutingModule} from './units-routing.module';
import {AppMaterialModule} from 'src/app/app-material.module';
import {SearchLayoutModule} from 'src/app/shared/components/search-layout/search-layout.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'src/app/shared/components/table/table.module';
import {StoreModule} from '@ngrx/store';
import {UNIT_STATE_NAME, unitReducer} from 'src/app/state/unit/unit.reducer';
import {EffectsModule} from '@ngrx/effects';
import {UnitEffect} from 'src/app/state/unit/unit.effect';
import {UnitListMobileModule} from './unit-list-mobile/unit-list-mobile.module';
import {UnitUpsertPageModule} from './unit-upsert-page/unit-upsert-page.module';
import {UnitUpdateDialogModule} from './unit-update-dialog/unit-update-dialog.module';

@NgModule({
  declarations: [UnitsComponent],
  imports: [
    CommonModule,
    UnitsRoutingModule,
    AppMaterialModule,
    SearchLayoutModule,
    ReactiveFormsModule,
    TableModule,
    UnitListMobileModule,
    UnitUpsertPageModule,
    UnitUpdateDialogModule,
    StoreModule.forFeature(UNIT_STATE_NAME, unitReducer),
    EffectsModule.forFeature([UnitEffect])
  ]
})
export class UnitsModule {}
