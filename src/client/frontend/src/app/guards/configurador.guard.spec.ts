import { TestBed } from '@angular/core/testing';

import { ConfiguradorGuard } from './configurador.guard';

describe('ConfiguradorGuard', () => {
  let guard: ConfiguradorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfiguradorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
