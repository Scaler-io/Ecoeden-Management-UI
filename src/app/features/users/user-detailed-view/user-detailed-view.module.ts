import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserDetailedViewComponent} from './user-detailed-view.component';
import {AppMaterialModule} from 'src/app/app-material.module';
import {IndividualDetailsModule} from './individual-details/individual-details.module';
import {PipesModule} from 'src/app/shared/pipes/pipes.module';
import {DividerModule} from 'src/app/shared/components/divider/divider.module';

@NgModule({
  declarations: [UserDetailedViewComponent],
  imports: [CommonModule, AppMaterialModule, IndividualDetailsModule, PipesModule, DividerModule],
  exports: [UserDetailedViewComponent]
})
export class UserDetailedViewModule {}
