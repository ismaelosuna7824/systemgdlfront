import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarBrokerComponent } from './nav-bar-broker.component';

describe('NavBarBrokerComponent', () => {
  let component: NavBarBrokerComponent;
  let fixture: ComponentFixture<NavBarBrokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarBrokerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
