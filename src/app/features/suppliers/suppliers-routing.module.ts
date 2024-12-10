import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SuppliersComponent} from './suppliers.component';
import {SupplierDetailedViewComponent} from './supplier-detailed-view/supplier-detailed-view.component';
import {SupplierUpsertPageComponent} from './supplier-upsert-page/supplier-upsert-page.component';

const routes: Routes = [
  {path: '', component: SuppliersComponent},
  {path: 'add', component: SupplierUpsertPageComponent, data: {breadcrumb: {label: 'Add new supplier'}}},
  {path: 'update', component: SupplierUpsertPageComponent, data: {breadcrumb: {label: 'Update supplier'}}},
  {path: ':id', component: SupplierDetailedViewComponent, data: {breadcrumb: {alias: 'suppliername'}}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule {}
