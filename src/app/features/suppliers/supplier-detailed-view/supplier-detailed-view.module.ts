import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupplierDetailedViewComponent} from './supplier-detailed-view.component';
import {BreadcrumbModule} from 'xng-breadcrumb';
import {AppMaterialModule} from 'src/app/app-material.module';
import {DividerModule} from 'src/app/shared/components/divider/divider.module';
import {IndividualDetailsModule} from '../../../shared/components/individual-details/individual-details.module';

@NgModule({
  declarations: [SupplierDetailedViewComponent],
  imports: [CommonModule, BreadcrumbModule, AppMaterialModule, DividerModule, IndividualDetailsModule],
  exports: [SupplierDetailedViewComponent]
})
export class SupplierDetailedViewModule {}
