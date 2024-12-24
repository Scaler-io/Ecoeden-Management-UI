import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitListMobileComponent} from './unit-list-mobile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {AppMaterialModule} from 'src/app/app-material.module';
import {PipesModule} from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [UnitListMobileComponent],
  imports: [CommonModule, AppMaterialModule, NgxPaginationModule, PipesModule],
  exports: [UnitListMobileComponent]
})
export class UnitListMobileModule {}
