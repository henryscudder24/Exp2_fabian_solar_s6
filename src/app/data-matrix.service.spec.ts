import { TestBed } from '@angular/core/testing';

import { DataMatrixService } from './data-matrix.service';

describe('DataMatrixService', () => {
  let service: DataMatrixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataMatrixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
