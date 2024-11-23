import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SuppliersComponent} from './suppliers.component';
import {SupplierDetailedViewComponent} from './supplier-detailed-view/supplier-detailed-view.component';

const routes: Routes = [
  {path: '', component: SuppliersComponent},
  {path: ':id', component: SupplierDetailedViewComponent, data: {breadcrumb: {alias: 'suppliername'}}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule {}
