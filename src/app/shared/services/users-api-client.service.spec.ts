import { TestBed } from '@angular/core/testing';

import { UsersApiClientService } from './users-api-client.service';

describe('UsersApiClientService', () => {
  let service: UsersApiClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersApiClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
