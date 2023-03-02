import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCredencialComponent } from './update-credencial.component';

describe('UpdateCredencialComponent', () => {
  let component: UpdateCredencialComponent;
  let fixture: ComponentFixture<UpdateCredencialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCredencialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCredencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
