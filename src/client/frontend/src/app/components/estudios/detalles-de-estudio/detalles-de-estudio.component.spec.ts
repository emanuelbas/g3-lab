import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesDeEstudioComponent } from './detalles-de-estudio.component';

describe('DetallesDeEstudioComponent', () => {
  let component: DetallesDeEstudioComponent;
  let fixture: ComponentFixture<DetallesDeEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesDeEstudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesDeEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
