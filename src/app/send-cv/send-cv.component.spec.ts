import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCvComponent } from './send-cv.component';

describe('SendCvComponent', () => {
  let component: SendCvComponent;
  let fixture: ComponentFixture<SendCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
