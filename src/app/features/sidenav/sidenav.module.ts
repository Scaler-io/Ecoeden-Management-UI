import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidenavComponent],
  imports: [CommonModule, AppMaterialModule, RouterModule],
  exports: [SidenavComponent],
})
export class SidenavModule {}
