import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealAddComponent } from './real-add.component';

describe('RealAddComponent', () => {
  let component: RealAddComponent;
  let fixture: ComponentFixture<RealAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
