import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentHeaderComponent } from './content-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [ContentHeaderComponent],
  imports: [CommonModule, BreadcrumbModule],
  exports: [ContentHeaderComponent],
})
export class ContentHeaderModule {}
