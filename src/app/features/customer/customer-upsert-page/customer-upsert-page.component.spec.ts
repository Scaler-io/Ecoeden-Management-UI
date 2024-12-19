import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpsertPageComponent } from './customer-upsert-page.component';

describe('CustomerUpsertPageComponent', () => {
  let component: CustomerUpsertPageComponent;
  let fixture: ComponentFixture<CustomerUpsertPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerUpsertPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUpsertPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
