import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoCapitalizeDirective} from './auto-capitalize.directive';

@NgModule({
  declarations: [AutoCapitalizeDirective],
  imports: [CommonModule],
  exports: [AutoCapitalizeDirective]
})
export class DirectiveModule {}
