import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitListMobileComponent } from './unit-list-mobile.component';

describe('UnitListMobileComponent', () => {
  let component: UnitListMobileComponent;
  let fixture: ComponentFixture<UnitListMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitListMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitListMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
