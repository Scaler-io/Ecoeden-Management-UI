export interface SearchRequestBase {
  isFilteredQuery: boolean;
  sortField?: string;
  sortOrder?: string;
  matchPhrase?: string;
  matchPhraseField?: string;
  startTime?: string;
  endTime?: string;
  timeField?: string;
  filters?: {[key: string]: string};
  pageSize: number;
  pageIndex: number;
}
