import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users.component';
import {UserDetailedViewComponent} from './user-detailed-view/user-detailed-view.component';
import {UserCreatePageComponent} from './user-create-page/user-create-page.component';
import {UserUpdatePageComponent} from './user-update-page/user-update-page.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {path: 'add', component: UserCreatePageComponent, data: {breadcrumb: {label: 'Add new user'}}},
  {path: ':id', component: UserDetailedViewComponent, data: {breadcrumb: {alias: 'username'}}},
  {path: 'update/:id', component: UserUpdatePageComponent, data: {breadcrumb: {label: 'Update user', alias: 'username'}}}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
