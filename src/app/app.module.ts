import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/auth/login/login.component';
import { SignUpComponent } from './views/auth/sign-up/sign-up.component';
import { SettingsComponent } from './views/settings/settings.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // alternative
import { FormsModule } from '@angular/forms';
import { PasswordVisibilityComponent } from './shared/password-visibility/password-visibility.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SettingsComponent,
    PasswordVisibilityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule, // <-- Add this
    // NoopAnimationsModule,  // <-- OR use this if you want animations disabled
    AppRoutingModule,
    HttpClientModule
  ],

  providers: [      {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }],

  bootstrap: [AppComponent]
})
export class AppModule { }
