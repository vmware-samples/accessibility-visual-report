import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrastCheckerComponent } from './contrast-checker.component';

describe('ContrastCheckerComponent', () => {
  let component: ContrastCheckerComponent;
  let fixture: ComponentFixture<ContrastCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContrastCheckerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContrastCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
