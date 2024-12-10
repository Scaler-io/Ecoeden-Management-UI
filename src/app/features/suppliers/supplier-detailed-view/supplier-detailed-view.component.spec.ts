import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SupplierDetailedViewComponent} from './supplier-detailed-view.component';

describe('SupplierDetailedViewComponent', () => {
  let component: SupplierDetailedViewComponent;
  let fixture: ComponentFixture<SupplierDetailedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierDetailedViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
