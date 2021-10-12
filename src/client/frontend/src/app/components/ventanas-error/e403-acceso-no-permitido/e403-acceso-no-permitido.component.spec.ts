import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E403AccesoNoPermitidoComponent } from './e403-acceso-no-permitido.component';

describe('E403AccesoNoPermitidoComponent', () => {
  let component: E403AccesoNoPermitidoComponent;
  let fixture: ComponentFixture<E403AccesoNoPermitidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ E403AccesoNoPermitidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(E403AccesoNoPermitidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
