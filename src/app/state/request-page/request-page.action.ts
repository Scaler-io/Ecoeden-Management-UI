import {Action} from '@ngrx/store';
import {RequestPageState} from './request-page.reducer';

export const REQUEST_PAGE_SET = 'REQUEST_PAGE_SET';

export class RequestPageSet implements Action {
  type: string = REQUEST_PAGE_SET;
  constructor(public payload: RequestPageState) {}
}

export type RequestPageActions = RequestPageSet;
