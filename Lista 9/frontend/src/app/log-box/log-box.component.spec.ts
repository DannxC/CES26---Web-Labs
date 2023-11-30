import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogBoxComponent } from './log-box.component';

describe('LogBoxComponent', () => {
  let component: LogBoxComponent;
  let fixture: ComponentFixture<LogBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogBoxComponent]
    });
    fixture = TestBed.createComponent(LogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
