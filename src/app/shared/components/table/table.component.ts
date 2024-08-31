import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {PaginationMetaData} from 'src/app/core/models/pagination';
import {TableColumnMap, TableDataSource} from 'src/app/core/models/table-source';

@Component({
  selector: 'ecoeden-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnChanges {
  @Input('dataSource') tableDataSource: MatTableDataSource<TableDataSource>;
  @Input('columns') columns: string[];
  @Input('fieldValueMap') fieldValueMap: TableColumnMap = null;
  @Input('actionsEnabled') actionEnabled: boolean;
  @Input('paginationMetadata') paginationMetaData: PaginationMetaData;
  @Input('dataLength') dataLength: number;

  @Output('pageChange') pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output('visit') visit: EventEmitter<TableDataSource> = new EventEmitter<TableDataSource>();
  @Output('edit') edit: EventEmitter<TableDataSource> = new EventEmitter<TableDataSource>();
  @Output('delete') delete: EventEmitter<TableDataSource> = new EventEmitter<TableDataSource>();

  constructor() {}

  ngOnChanges(): void {
    if (this.actionEnabled && !this.columns.includes('actions')) {
      this.columns.push('actions');
      this.fieldValueMap = {
        ...this.fieldValueMap,
        actions: {
          value: 'actions',
          isDateField: false,
          isStatusField: false
        }
      };
    } else if (!this.actionEnabled && this.columns.includes('actions')) {
      this.columns = this.columns.filter(column => column != 'actions');
    } else {
      this.fieldValueMap = {
        ...this.fieldValueMap,
        actions: {
          value: 'actions',
          isDateField: false,
          isStatusField: false
        }
      };
    }
  }

  ngOnInit(): void {}

  public onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }

  public onVisit(item: TableDataSource): void {
    this.actionEnabled && this.visit.emit(item);
  }

  public onEdit(item: TableDataSource): void {
    this.actionEnabled && this.edit.emit(item);
  }

  public onDelete(item: TableDataSource): void {
    this.actionEnabled && this.delete.emit(item);
  }

  public getColumnKey(column: string): string {
    return Object.keys(this.fieldValueMap).find(k => k === column);
  }

  public getColumnValue(column: string): string {
    return this.fieldValueMap[Object.keys(this.fieldValueMap).find(k => k === column)].value;
  }

  public isDateField(column: string): boolean {
    return this.fieldValueMap[Object.keys(this.fieldValueMap).find(k => k === column)].isDateField;
  }

  public isStatusField(column: string): boolean {
    return this.fieldValueMap[Object.keys(this.fieldValueMap).find(k => k === column)].isStatusField;
  }

  public slideToggle(event) {
    console.log(event);
  }
}
