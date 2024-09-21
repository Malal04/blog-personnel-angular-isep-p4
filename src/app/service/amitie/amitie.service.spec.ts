import { TestBed } from '@angular/core/testing';

import { AmitieService } from './amitie.service';

describe('AmitieService', () => {
  let service: AmitieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmitieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
