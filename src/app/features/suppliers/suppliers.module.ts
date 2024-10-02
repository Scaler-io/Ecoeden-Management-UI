import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SuppliersRoutingModule} from './suppliers-routing.module';
import {SuppliersComponent} from './suppliers.component';

@NgModule({
  declarations: [SuppliersComponent],
  imports: [CommonModule, SuppliersRoutingModule]
})
export class SuppliersModule {}
