/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActualizacionService } from './actualizacion.service';

describe('Service: Actualizacion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActualizacionService]
    });
  });

  it('should ...', inject([ActualizacionService], (service: ActualizacionService) => {
    expect(service).toBeTruthy();
  }));
});
