import {CommandResponse} from './common';
import {DialogData} from './dialog.model';
import {PaginatedResult} from './pagination';
import {SearchRequestBase} from './search-request';
import {TableDataSource} from './table-source';

export class PaginatedUnitList extends PaginatedResult {
  constructor(
    public pageIndex: number,
    public pageSize: number,
    public count: number,
    public data: UnitSummary[]
  ) {
    super(pageIndex, pageSize, count, data);
  }
}

export interface UnitSearchRequest extends SearchRequestBase {}

export interface UnitSummary extends TableDataSource {
  id: string;
  name: string;
  status: boolean;
  createdOn: Date | null;
  updatedOn: Date | null;
}

export interface Unit {
  id: string;
  name: string;
  status: boolean;
  metaData: MetaData;
}

interface MetaData {
  createdAt: Date | string;
  updatedAt: Date | string;
  createdBy: string;
  updtedBy: string;
}

export interface UpsertUnitRequest {
  id?: string;
  name: string;
  status: boolean;
}

export interface UnitCommandResponse extends CommandResponse {
  unitId: string;
}

export enum UnitCommadType {
  Upsert = 'Unit created or updated',
  Delete = 'Unit deleted'
}

export interface UnitFormModel {
  unitName: string;
  status?: boolean;
}

export interface UnitUpdateDialogData extends DialogData {
  unit: UnitSummary;
}
