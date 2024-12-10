import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SupplierUpsertPageComponent} from './supplier-upsert-page.component';

describe('SupplierUpsertPageComponent', () => {
  let component: SupplierUpsertPageComponent;
  let fixture: ComponentFixture<SupplierUpsertPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierUpsertPageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierUpsertPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
