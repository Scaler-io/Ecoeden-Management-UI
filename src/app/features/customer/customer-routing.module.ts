import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CustomerComponent} from './customer.component';
import {CustomerDetailedViewComponent} from './customer-detailed-view/customer-detailed-view.component';

const routes: Routes = [
  {path: '', component: CustomerComponent},
  {path: ':id', component: CustomerDetailedViewComponent, data: {breadcrumb: {alias: 'customername'}}}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
