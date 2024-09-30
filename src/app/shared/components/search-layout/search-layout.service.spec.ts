import { TestBed } from '@angular/core/testing';

import { SearchLayoutService } from './search-layout.service';

describe('SearchLayoutService', () => {
  let service: SearchLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
