import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS_PROVIDER } from './http-interceptors';
import { ImportsModule } from './imports/imports.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
    declarations: [AppComponent, RegistrationComponent, HomeComponent, LoginComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, ImportsModule],
    providers: [HTTP_INTERCEPTORS_PROVIDER],
    bootstrap: [AppComponent],
})
export class AppModule {}
