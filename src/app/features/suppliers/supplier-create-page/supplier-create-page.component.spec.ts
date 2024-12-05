import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SupplierCreatePageComponent} from './supplier-create-page.component';

describe('SupplierCreatePageComponent', () => {
  let component: SupplierCreatePageComponent;
  let fixture: ComponentFixture<SupplierCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierCreatePageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
