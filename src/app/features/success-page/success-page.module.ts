import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuccessPageRoutingModule} from './success-page-routing.module';
import {SuccessPageComponent} from './success-page.component';
import {ButtonModule} from '../../shared/components/button/button.module';

@NgModule({
  declarations: [SuccessPageComponent],
  imports: [CommonModule, SuccessPageRoutingModule, ButtonModule, ButtonModule]
})
export class SuccessPageModule {}
