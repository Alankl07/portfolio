import { TestBed } from '@angular/core/testing';

import { WabSocketService } from './wab-socket.service';

describe('WabSocketService', () => {
  let service: WabSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WabSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
