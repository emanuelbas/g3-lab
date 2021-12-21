import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaEstudiosComponent } from './grilla-estudios.component';

describe('GrillaEstudiosComponent', () => {
  let component: GrillaEstudiosComponent;
  let fixture: ComponentFixture<GrillaEstudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillaEstudiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaEstudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
