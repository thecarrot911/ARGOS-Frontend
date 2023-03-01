import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCredencialComponent } from './add-credencial.component';

describe('AddCredencialComponent', () => {
  let component: AddCredencialComponent;
  let fixture: ComponentFixture<AddCredencialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCredencialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCredencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
