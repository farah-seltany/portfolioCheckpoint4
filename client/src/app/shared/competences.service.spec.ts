import { TestBed } from '@angular/core/testing';

import { CompetencesService } from './competences.service';

describe('CompetencesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompetencesService = TestBed.get(CompetencesService);
    expect(service).toBeTruthy();
  });
});
