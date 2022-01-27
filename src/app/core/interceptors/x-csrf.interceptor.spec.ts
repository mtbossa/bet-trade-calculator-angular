import { TestBed } from '@angular/core/testing';

import { XXsrfInterceptor } from './x-csrf.interceptor';

describe('XXsrfInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [XXsrfInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: XXsrfInterceptor = TestBed.inject(XXsrfInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
