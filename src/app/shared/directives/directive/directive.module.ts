import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoCapitalizeDirective} from './auto-capitalize.directive';
import {NumberOnlyDirective} from './number-only.directive';
import {InputLimitDirective} from './input-limit.directive';

@NgModule({
  declarations: [AutoCapitalizeDirective, NumberOnlyDirective, InputLimitDirective],
  imports: [CommonModule],
  exports: [AutoCapitalizeDirective, NumberOnlyDirective, InputLimitDirective]
})
export class DirectiveModule {}
