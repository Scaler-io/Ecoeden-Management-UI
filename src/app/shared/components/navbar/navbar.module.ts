import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MatExpansionModule, MatRippleModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
