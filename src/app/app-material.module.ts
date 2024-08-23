import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  MAT_RIPPLE_GLOBAL_OPTIONS,
  MatRippleModule,
  RippleGlobalOptions,
} from '@angular/material/core';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: false,
  animation: {
    enterDuration: 300,
    exitDuration: 0,
  },
};

const MaterialComponentModule = [
  MatSidenavModule,
  MatExpansionModule,
  MatRippleModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialComponentModule],
  exports: [MaterialComponentModule],
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
  ],
})
export class AppMaterialModule {}