import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeBannerComponent } from './notice-banner.component';

describe('NoticeBannerComponent', () => {
  let component: NoticeBannerComponent;
  let fixture: ComponentFixture<NoticeBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
