import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompAddComponent } from './comp-add.component';

describe('CompAddComponent', () => {
  let component: CompAddComponent;
  let fixture: ComponentFixture<CompAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
