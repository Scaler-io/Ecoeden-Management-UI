import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar.component';
import {AppMaterialModule} from 'src/app/app-material.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, AppMaterialModule],
  exports: [NavbarComponent]
})
export class NavbarModule {}
