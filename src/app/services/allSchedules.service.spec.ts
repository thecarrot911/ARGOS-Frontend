/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AllSchedulesService } from './allSchedules.service';

describe('Service: AllSchedules', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllSchedulesService]
    });
  });

  it('should ...', inject([AllSchedulesService], (service: AllSchedulesService) => {
    expect(service).toBeTruthy();
  }));
});
