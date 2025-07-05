import { TestBed } from '@angular/core/testing';

import { AirHiveApiService } from './air-hive-api.service';

describe('AirHiveApiService', () => {
  let service: AirHiveApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirHiveApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
