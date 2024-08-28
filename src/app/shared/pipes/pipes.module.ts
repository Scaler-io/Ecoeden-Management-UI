import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './capitalize.pipe';
import { FormatDatePipe } from './format-date.pipe';
import { FormatStatusPipe } from './format-status.pipe';

@NgModule({
  declarations: [CapitalizePipe, FormatDatePipe, FormatStatusPipe],
  imports: [CommonModule],
  exports: [CapitalizePipe, FormatDatePipe, FormatStatusPipe],
})
export class PipesModule {}
