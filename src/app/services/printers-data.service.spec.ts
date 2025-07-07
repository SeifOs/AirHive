import { TestBed } from '@angular/core/testing';

import { PrintersDataService } from './printers-data.service';

describe('PrintersDataService', () => {
  let service: PrintersDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintersDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
