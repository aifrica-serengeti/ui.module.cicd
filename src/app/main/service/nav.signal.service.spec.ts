import { TestBed } from '@angular/core/testing';

import { NavSignalService } from './nav.signal.service';

describe('NavService', () => {
  let service: NavSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
