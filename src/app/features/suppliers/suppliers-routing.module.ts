import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SuppliersComponent} from './suppliers.component';
import {SupplierDetailedViewComponent} from './supplier-detailed-view/supplier-detailed-view.component';
import {SupplierCreatePageComponent} from './supplier-create-page/supplier-create-page.component';

const routes: Routes = [
  {path: '', component: SuppliersComponent},
  {path: 'add', component: SupplierCreatePageComponent, data: {breadcrumb: {label: 'Add new supplier'}}},
  {path: ':id', component: SupplierDetailedViewComponent, data: {breadcrumb: {alias: 'suppliername'}}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule {}
