import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SupplierListMobileComponent} from './supplier-list-mobile.component';

describe('SupplierListMobileComponent', () => {
  let component: SupplierListMobileComponent;
  let fixture: ComponentFixture<SupplierListMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierListMobileComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierListMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
