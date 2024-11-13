import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupplierListMobileComponent} from './supplier-list-mobile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {AppMaterialModule} from 'src/app/app-material.module';
import {PipesModule} from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [SupplierListMobileComponent],
  imports: [CommonModule, AppMaterialModule, NgxPaginationModule, PipesModule],
  exports: [SupplierListMobileComponent]
})
export class SupplierListMobileModule {}
