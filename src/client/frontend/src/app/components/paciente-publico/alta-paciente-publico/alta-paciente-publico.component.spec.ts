import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPacientePublicoComponent } from './alta-paciente-publico.component';

describe('AltaPacientePublicoComponent', () => {
  let component: AltaPacientePublicoComponent;
  let fixture: ComponentFixture<AltaPacientePublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaPacientePublicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaPacientePublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
