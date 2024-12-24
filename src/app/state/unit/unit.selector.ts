import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UNIT_STATE_NAME, UnitState} from './unit.reducer';
import {PaginatedUnitList} from 'src/app/core/models/unit';

const unitState = createFeatureSelector<UnitState>(UNIT_STATE_NAME);

export const getPaginatedUnits = createSelector(unitState, state => {
  return <PaginatedUnitList>{
    count: state.count,
    pageIndex: state.currentPage,
    pageSize: state.top,
    data: state.units
  };
});

export const getUnitDetails = createSelector(unitState, state => {
  return state.unit;
});

export const getUnitCount = createSelector(unitState, state => {
  return state.totalUnits;
});

export const getUnitCommandResponse = createSelector(unitState, state => {
  return state.unitCommandResponse;
});
