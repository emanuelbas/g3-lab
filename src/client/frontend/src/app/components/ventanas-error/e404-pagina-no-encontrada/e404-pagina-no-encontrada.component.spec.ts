import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E404PaginaNoEncontradaComponent } from './e404-pagina-no-encontrada.component';

describe('E404PaginaNoEncontradaComponent', () => {
  let component: E404PaginaNoEncontradaComponent;
  let fixture: ComponentFixture<E404PaginaNoEncontradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ E404PaginaNoEncontradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(E404PaginaNoEncontradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
