import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {UsersRoutingModule} from './users-routing.module';
import {EffectsModule} from '@ngrx/effects';
import {UserStateEffect} from 'src/app/state/user/user.effect';
import {StoreModule} from '@ngrx/store';
import {USER_STATE_NAME, userReducer} from 'src/app/state/user/user.reducer';
import {TableModule} from 'src/app/shared/components/table/table.module';
import {AppMaterialModule} from 'src/app/app-material.module';
import {UserListMobileModule} from './user-list-mobile/user-list-mobile.module';
import {UserDetailedViewModule} from './user-detailed-view/user-detailed-view.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchLayoutModule} from 'src/app/shared/components/search-layout/search-layout.module';
import {UserCreatePageModule} from './user-create-page/user-create-page.module';
import {UserUpdatePageModule} from './user-update-page/user-update-page.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    StoreModule.forFeature(USER_STATE_NAME, userReducer),
    EffectsModule.forFeature([UserStateEffect]),
    TableModule,
    AppMaterialModule,
    UserListMobileModule,
    UserDetailedViewModule,
    UserCreatePageModule,
    UserUpdatePageModule,
    ReactiveFormsModule,
    SearchLayoutModule
  ]
})
export class UsersModule {}
