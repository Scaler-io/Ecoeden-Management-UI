import {TestBed} from '@angular/core/testing';

import {PreventSuccessPageGuard} from './prevent-success-page.guard';

describe('PreventSuccessPageGuard', () => {
  let guard: PreventSuccessPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventSuccessPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
