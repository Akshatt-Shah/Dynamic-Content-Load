import { TestBed } from '@angular/core/testing';

import { CategorysequenceService } from './categorysequence.service';

describe('CategorysequenceService', () => {
  let service: CategorysequenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorysequenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
