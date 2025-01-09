import {Action} from '@ngrx/store';
import {
  Unit,
  UnitCommandResponse,
  UnitSearchRequest,
  PaginatedUnitList,
  UpsertUnitRequest
} from 'src/app/core/models/unit';

export const GET_ALL_UNITS = 'GET_ALL_UNITS';
export const GET_ALL_UNITS_SUCCESS = 'GET_ALL_UNITS_SUCCESS';

export const GET_UNIT_COUNT = 'GET_UNIT_COUNT';
export const GET_UNIT_COUNT_SUCCESS = 'GET_UNIT_COUNT_SUCCESS';

export const GET_UNIT_DETAILS = 'GET_UNIT_DETAILS';
export const GET_UNIT_DETAILS_SUCCESS = 'GET_UNIT_DETAILS_SUCCESS';

export const UPSERT_UNIT = 'UPSERT_UNIT';
export const UPSERT_UNIT_SUCCESS = 'UPSERT_UNIT_SUCCESS';
export const UPSERT_UNIT_FAILURE = 'UPSERT_UNIT_FAILURE';

export const DELETE_UNIT = 'DELETE_UNIT';
export const DELETE_UNIT_SUCCESS = 'DELETE_UNIT_SUCCESS';
export const DELETE_UNIT_FAILURE = 'DELETE_UNIT_FAILURE';

export const CLEAR_UNIT_COMMAND_RESULT = 'CLEAR_UNIT_COMMAND_RESULT';

export class GetAllUnits implements Action {
  type: string = GET_ALL_UNITS;
  constructor(public payload: UnitSearchRequest) {}
}

export class GetAllUnitSuccess implements Action {
  type: string = GET_ALL_UNITS_SUCCESS;
  constructor(public payload: PaginatedUnitList) {}
}

export class GetUnitCount implements Action {
  type: string = GET_UNIT_COUNT;
  constructor(public payload?: UnitSearchRequest) {}
}

export class GetUnitCountSuccess implements Action {
  type: string = GET_UNIT_COUNT_SUCCESS;
  constructor(public payload: number) {}
}

export class GetUnitDetails implements Action {
  type: string = GET_UNIT_DETAILS;
  constructor(public payload: string) {}
}

export class GetUnitDetailsSuccess implements Action {
  type: string = GET_UNIT_DETAILS_SUCCESS;
  constructor(public payload: Unit) {}
}

export class UpsertUnit implements Action {
  type: string = UPSERT_UNIT;
  constructor(public payload: UpsertUnitRequest) {}
}

export class UpsertUnitSuccess implements Action {
  type: string = UPSERT_UNIT_SUCCESS;
  constructor(public payload: UnitCommandResponse) {}
}

export class UpsertUnitFailure implements Action {
  type: string = UPSERT_UNIT_FAILURE;
  constructor(public payload: UnitCommandResponse) {}
}

export class DeleteUnit implements Action {
  type: string = DELETE_UNIT;
  constructor(public payload: string) {}
}

export class DeleteUnitSuccess implements Action {
  type: string = DELETE_UNIT_SUCCESS;
  constructor(public payload: UnitCommandResponse) {}
}

export class DeleteUnitFailure implements Action {
  type: string = DELETE_UNIT_FAILURE;
  constructor(public payload: UnitCommandResponse) {}
}

export class ClearUnitCommandResult implements Action {
  type: string = CLEAR_UNIT_COMMAND_RESULT;
  constructor(public payload?: any) {}
}

export type UnitActions =
  | GetAllUnits
  | GetAllUnitSuccess
  | GetUnitCount
  | GetUnitCountSuccess
  | GetUnitDetails
  | GetUnitDetailsSuccess
  | UpsertUnit
  | UpsertUnitSuccess
  | UpsertUnitFailure
  | DeleteUnit
  | DeleteUnitSuccess
  | DeleteUnitFailure
  | ClearUnitCommandResult;
