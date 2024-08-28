import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListMobileComponent } from './user-list-mobile.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [UserListMobileComponent],
  imports: [CommonModule, AppMaterialModule, NgxPaginationModule, PipesModule],
  exports: [UserListMobileComponent],
})
export class UserListMobileModule {}
