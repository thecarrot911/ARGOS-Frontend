import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItinerarioComponent } from './modal-itinerario.component';

describe('ModalItinerarioComponent', () => {
  let component: ModalItinerarioComponent;
  let fixture: ComponentFixture<ModalItinerarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalItinerarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalItinerarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
