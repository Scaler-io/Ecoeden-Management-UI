import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { AppMaterialModule } from 'src/app/app-material.module';

@NgModule({
  declarations: [SidenavComponent],
  imports: [CommonModule, AppMaterialModule],
  exports: [SidenavComponent],
})
export class SidenavModule {}
