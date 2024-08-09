import { TestBed } from '@angular/core/testing';

import { OrderApiClientService } from './order-api-client.service';

describe('OrderApiClientService', () => {
  let service: OrderApiClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderApiClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
