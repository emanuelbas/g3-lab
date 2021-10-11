import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitioEnMantenimientoComponent } from './sitio-en-mantenimiento.component';

describe('SitioEnMantenimientoComponent', () => {
  let component: SitioEnMantenimientoComponent;
  let fixture: ComponentFixture<SitioEnMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitioEnMantenimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitioEnMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
