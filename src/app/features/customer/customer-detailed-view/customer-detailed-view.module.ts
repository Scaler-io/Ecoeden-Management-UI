import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerDetailedViewComponent} from './customer-detailed-view.component';
import {AppMaterialModule} from 'src/app/app-material.module';
import {DividerModule} from 'src/app/shared/components/divider/divider.module';
import {BreadcrumbModule} from 'xng-breadcrumb';
import {IndividualDetailsModule} from 'src/app/shared/components/individual-details/individual-details.module';
import {ConfirmDialogModule} from 'src/app/shared/components/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [CustomerDetailedViewComponent],
  imports: [CommonModule, AppMaterialModule, DividerModule, BreadcrumbModule, IndividualDetailsModule, ConfirmDialogModule],
  exports: [CustomerDetailedViewComponent]
})
export class CustomerDetailedViewModule {}
