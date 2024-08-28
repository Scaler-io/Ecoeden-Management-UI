export interface IPaginatedResult {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: any[];
}

export interface PaginationMetaData {
  top: number;
  count: number;
  currentPage: number;
}

export class PaginatedResult implements IPaginatedResult {
  constructor(public pageIndex, public pageSize, public count, public data) {}
}
