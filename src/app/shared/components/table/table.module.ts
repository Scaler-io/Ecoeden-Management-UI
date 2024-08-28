import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CdkTableModule } from '@angular/cdk/table';
import { PipesModule } from '../../pipes/pipes.module';
import { BadgeModule } from '../badge/badge.module';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, AppMaterialModule, CdkTableModule, PipesModule, BadgeModule],
  exports: [TableComponent],
})
export class TableModule {}
