import { TestBed } from '@angular/core/testing';

import { ShoppingMarketFormService } from './shopping-market-form.service';

describe('ShoppingMarketFormService', () => {
  let service: ShoppingMarketFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingMarketFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
