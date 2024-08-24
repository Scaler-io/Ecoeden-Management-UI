import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppMaterialModule } from './app-material.module';
import { SidenavModule } from './features/sidenav/sidenav.module';
import { FooterModule } from './shared/components/footer/footer.module';
import { ContentHeaderModule } from './shared/components/content-header/content-header.module';

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
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
