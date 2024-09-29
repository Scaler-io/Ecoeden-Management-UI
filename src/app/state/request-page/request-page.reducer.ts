import * as requestPageActions from './request-page.action';

export const REQUEST_PAGE_STATE_NAME = 'requestPage';

export interface RequestPageState {
  requestPage: string;
  heading: string;
  subheading: string;
  previousUrl?: string;
  nextUrl: string;
}

const initialState: RequestPageState = {
  requestPage: '',
  heading: '',
  subheading: '',
  previousUrl: '',
  nextUrl: ''
};

export function requestPageReducers(state: RequestPageState = initialState, action: requestPageActions.RequestPageActions) {
  switch (action.type) {
    case requestPageActions.REQUEST_PAGE_SET:
      return {
        ...state,
        requestPage: action.payload.requestPage,
        heading: action.payload.heading,
        subheading: action.payload.subheading,
        previousUrl: action.payload.previousUrl,
        nextUrl: action.payload.nextUrl
      };
    default:
      return state;
  }
}
