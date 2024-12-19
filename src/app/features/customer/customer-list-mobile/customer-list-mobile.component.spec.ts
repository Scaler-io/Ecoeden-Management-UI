import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListMobileComponent } from './customer-list-mobile.component';

describe('CustomerListMobileComponent', () => {
  let component: CustomerListMobileComponent;
  let fixture: ComponentFixture<CustomerListMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerListMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
