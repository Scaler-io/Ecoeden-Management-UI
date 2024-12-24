import {Unit, UnitCommandResponse, UnitSummary, PaginatedUnitList} from 'src/app/core/models/unit';
import * as unitActions from './unit.action';

export const UNIT_STATE_NAME = 'unit';

export interface UnitState {
  unit: Unit;
  units: UnitSummary[];
  count: number;
  top: number;
  currentPage: number;
  totalUnits: number;
  unitCommandResponse: UnitCommandResponse;
}

const initialState: UnitState = {
  unit: null,
  units: [],
  count: 0,
  currentPage: 0,
  top: 0,
  totalUnits: 0,
  unitCommandResponse: null
};

export function unitReducer(state: UnitState = initialState, action: unitActions.UnitActions): UnitState {
  switch (action.type) {
    case unitActions.GET_ALL_UNITS:
      return {
        ...state,
        units: []
      };
    case unitActions.GET_ALL_UNITS_SUCCESS:
      const {count, data, pageIndex, pageSize} = action.payload as PaginatedUnitList;
      return {
        ...state,
        units: data,
        top: pageSize,
        count: count,
        currentPage: pageIndex
      };
    case unitActions.GET_UNIT_COUNT:
      return {
        ...state,
        totalUnits: 0
      };
    case unitActions.GET_UNIT_COUNT_SUCCESS:
      return {
        ...state,
        totalUnits: action.payload as number
      };
    case unitActions.GET_UNIT_DETAILS:
      return {
        ...state,
        unit: null
      };
    case unitActions.GET_UNIT_DETAILS_SUCCESS:
      return {
        ...state,
        unit: action.payload as Unit
      };
    case unitActions.UPSERT_UNIT:
      return {
        ...state
      };
    case unitActions.UPSERT_UNIT_SUCCESS:
      return {
        ...state,
        unitCommandResponse: action.payload as UnitCommandResponse
      };
    case unitActions.UPSERT_UNIT_FAILURE:
      return {
        ...state,
        unitCommandResponse: action.payload as UnitCommandResponse
      };
    case unitActions.DELETE_UNIT:
      return {
        ...state,
        unitCommandResponse: null
      };
    case unitActions.DELETE_UNIT_SUCCESS:
      return {
        ...state,
        unitCommandResponse: action.payload as UnitCommandResponse
      };
    case unitActions.DELETE_UNIT_FAILURE:
      return {
        ...state,
        unitCommandResponse: action.payload as UnitCommandResponse
      };
    case unitActions.CLEAR_UNIT_COMMAND_RESULT:
      return {
        ...state,
        unitCommandResponse: null
      };
    default:
      return state;
  }
}
