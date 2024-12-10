import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarModule} from './shared/components/navbar/navbar.module';
import {StoreModule} from '@ngrx/store';
import {appReducers} from './store/app.state';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from 'src/environments/environment';
import {AppMaterialModule} from './app-material.module';
import {SidenavModule} from './features/sidenav/sidenav.module';
import {FooterModule} from './shared/components/footer/footer.module';
import {ContentHeaderModule} from './shared/components/content-header/content-header.module';
import {AuthModule} from 'angular-auth-oidc-client';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {AuthInterceptor} from './core/auth/auth.interceptor';
import {ToastrModule} from 'ngx-toastr';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig} from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavbarModule,
    SidenavModule,
    FooterModule,
    AppMaterialModule,
    ContentHeaderModule,
    AuthModule.forRoot({
      config: {
        ...environment.oidcConfig,
        refreshTokenRetryInSeconds: 3600 * 24,
        silentRenewTimeoutInSeconds: 3600 * 24,
        tokenRefreshInSeconds: 3600 * 24
      }
    }),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    ToastrModule.forRoot({
      closeButton: true,
      tapToDismiss: true,
      positionClass: 'toast-bottom-right',
      // timeOut: 1000,
      disableTimeOut: true,
      autoDismiss: false,
      preventDuplicates: true
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: <MatDialogConfig>{
        width: '600px',
        maxWidth: '600px',
        hasBackdrop: true,
        disableClose: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
