import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitUpsertPageComponent } from './unit-upsert-page.component';

describe('UnitUpsertPageComponent', () => {
  let component: UnitUpsertPageComponent;
  let fixture: ComponentFixture<UnitUpsertPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitUpsertPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitUpsertPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
