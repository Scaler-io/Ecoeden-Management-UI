import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchLayoutComponent} from './search-layout.component';
import {AppMaterialModule} from 'src/app/app-material.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SearchLayoutComponent],
  imports: [CommonModule, AppMaterialModule, ReactiveFormsModule],
  exports: [SearchLayoutComponent]
})
export class SearchLayoutModule {}
