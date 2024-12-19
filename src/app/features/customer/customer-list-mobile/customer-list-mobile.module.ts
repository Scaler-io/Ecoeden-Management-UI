import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerListMobileComponent} from './customer-list-mobile.component';
import {AppMaterialModule} from 'src/app/app-material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [CustomerListMobileComponent],
  imports: [CommonModule, AppMaterialModule, NgxPaginationModule, PipesModule],
  exports: [CustomerListMobileComponent]
})
export class CustomerListMobileModule {}
