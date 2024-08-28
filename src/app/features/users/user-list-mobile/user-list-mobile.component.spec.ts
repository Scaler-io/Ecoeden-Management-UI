import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListMobileComponent } from './user-list-mobile.component';

describe('UserListMobileComponent', () => {
  let component: UserListMobileComponent;
  let fixture: ComponentFixture<UserListMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
