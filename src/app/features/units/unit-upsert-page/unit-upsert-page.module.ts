import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitUpsertPageComponent} from './unit-upsert-page.component';
import {AppMaterialModule} from 'src/app/app-material.module';
import {DividerModule} from 'src/app/shared/components/divider/divider.module';
import {ButtonModule} from 'src/app/shared/components/button/button.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [UnitUpsertPageComponent],
  imports: [CommonModule, AppMaterialModule, DividerModule, ButtonModule, ReactiveFormsModule],
  exports: [UnitUpsertPageComponent]
})
export class UnitUpsertPageModule {}
