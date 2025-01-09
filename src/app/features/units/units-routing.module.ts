import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UnitsComponent} from './units.component';
import {UnitUpsertPageComponent} from './unit-upsert-page/unit-upsert-page.component';

const routes: Routes = [
  {path: '', component: UnitsComponent},
  {path: 'add', component: UnitUpsertPageComponent, data: {breadcrumb: {label: 'Create new unit'}}}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule {}
