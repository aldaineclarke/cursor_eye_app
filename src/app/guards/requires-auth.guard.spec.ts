import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { requiresAuthGuard } from './requires-auth.guard';

describe('requiresAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => requiresAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
