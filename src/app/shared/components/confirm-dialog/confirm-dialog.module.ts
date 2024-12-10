import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from './confirm-dialog.component';
import {AppMaterialModule} from 'src/app/app-material.module';
import {ButtonModule} from '../button/button.module';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, AppMaterialModule, ButtonModule],
  exports: [ConfirmDialogComponent]
})
export class ConfirmDialogModule {}
