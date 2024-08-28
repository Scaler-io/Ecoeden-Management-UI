export interface TableDataSource {}

export interface TableColumnMap {
  [key: string]: TableColumnValueMap;
}

export interface TableColumnValueMap {
  value: string;
  isDateField: boolean;
  isStatusField: boolean;
}
