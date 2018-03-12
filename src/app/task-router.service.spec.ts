import { TestBed, inject } from '@angular/core/testing';

import { TaskRouterService } from './task-router.service';

describe('TaskRouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskRouterService]
    });
  });

  it('should be created', inject([TaskRouterService], (service: TaskRouterService) => {
    expect(service).toBeTruthy();
  }));
});
