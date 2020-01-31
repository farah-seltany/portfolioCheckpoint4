import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationChangementComponent } from './confirmation-changement.component';

describe('ConfirmationChangementComponent', () => {
  let component: ConfirmationChangementComponent;
  let fixture: ComponentFixture<ConfirmationChangementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationChangementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationChangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
