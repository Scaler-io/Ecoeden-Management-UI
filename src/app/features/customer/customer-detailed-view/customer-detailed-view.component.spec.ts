import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailedViewComponent } from './customer-detailed-view.component';

describe('CustomerDetailedViewComponent', () => {
  let component: CustomerDetailedViewComponent;
  let fixture: ComponentFixture<CustomerDetailedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
