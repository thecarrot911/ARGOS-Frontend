import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmpleadosComponent } from './all-empleados.component';

describe('AllEmpleadosComponent', () => {
  let component: AllEmpleadosComponent;
  let fixture: ComponentFixture<AllEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEmpleadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
