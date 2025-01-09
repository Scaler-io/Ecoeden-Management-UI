import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitUpdateDialogComponent } from './unit-update-dialog.component';

describe('UnitUpdateDialogComponent', () => {
  let component: UnitUpdateDialogComponent;
  let fixture: ComponentFixture<UnitUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
