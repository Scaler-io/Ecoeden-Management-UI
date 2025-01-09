import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitUpdateDialogComponent} from './unit-update-dialog.component';
import {AppMaterialModule} from 'src/app/app-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'src/app/shared/components/button/button.module';

@NgModule({
  declarations: [UnitUpdateDialogComponent],
  imports: [CommonModule, AppMaterialModule, ReactiveFormsModule, ButtonModule],
  exports: [UnitUpdateDialogComponent]
})
export class UnitUpdateDialogModule {}
