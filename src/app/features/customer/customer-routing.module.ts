import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CustomerComponent} from './customer.component';
import {CustomerDetailedViewComponent} from './customer-detailed-view/customer-detailed-view.component';
import {CustomerUpsertPageComponent} from './customer-upsert-page/customer-upsert-page.component';

const routes: Routes = [
  {path: '', component: CustomerComponent},
  {path: 'add', component: CustomerUpsertPageComponent, data: {breadcrumb: {label: 'Add new customer'}}},
  {path: 'update', component: CustomerUpsertPageComponent, data: {breadcrumb: {label: 'Update customer'}}},
  {path: ':id', component: CustomerDetailedViewComponent, data: {breadcrumb: {alias: 'customername'}}}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
