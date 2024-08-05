import { TestBed } from '@angular/core/testing';

import { ProductcategorysequenceService } from './productcategorysequence.service';

describe('ProductcategorysequenceService', () => {
  let service: ProductcategorysequenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductcategorysequenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
