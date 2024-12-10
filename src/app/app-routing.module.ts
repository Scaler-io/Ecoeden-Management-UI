import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {PreventSuccessPageGuard} from './core/guards/prevent-success-page.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {breadcrumb: {label: 'Dashboard'}},
    pathMatch: 'full'
  },
  {
    path: 'suppliers',
    loadChildren: () => import('./features/suppliers/suppliers.module').then(m => m.SuppliersModule),
    data: {breadcrumb: {label: 'Suppliers'}}
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    data: {breadcrumb: {label: 'Users'}}
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule),
    data: {breadcrumb: {label: 'Products'}}
  },
  {
    path: 'customers',
    loadChildren: () => import('./features/customer/customer.module').then(m => m.CustomerModule),
    data: {breadcrumb: {label: 'Customers'}}
  },
  {
    path: 'success',
    canActivate: [PreventSuccessPageGuard],
    loadChildren: () => import('./features/success-page/success-page.module').then(m => m.SuccessPageModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
