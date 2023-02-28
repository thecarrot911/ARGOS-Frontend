import { TestBed } from '@angular/core/testing';

import { AllempleadosService } from './allempleados.service';

describe('AllempleadosService', () => {
  let service: AllempleadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllempleadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
