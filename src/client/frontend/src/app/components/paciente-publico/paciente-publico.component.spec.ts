import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientePublicoComponent } from './paciente-publico.component';

describe('PacientePublicoComponent', () => {
  let component: PacientePublicoComponent;
  let fixture: ComponentFixture<PacientePublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientePublicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientePublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
