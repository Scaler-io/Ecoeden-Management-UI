import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button.component';
import {AppMaterialModule} from 'src/app/app-material.module';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, AppMaterialModule],
  exports: [ButtonComponent]
})
export class ButtonModule {}
