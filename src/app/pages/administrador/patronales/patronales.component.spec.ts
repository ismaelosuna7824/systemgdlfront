import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronalesComponent } from './patronales.component';

describe('PatronalesComponent', () => {
  let component: PatronalesComponent;
  let fixture: ComponentFixture<PatronalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatronalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
