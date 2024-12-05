import {TestBed} from '@angular/core/testing';

import {PostcodeValidationService} from './postcode-validation.service';

describe('PostcodeValidationService', () => {
  let service: PostcodeValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostcodeValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
