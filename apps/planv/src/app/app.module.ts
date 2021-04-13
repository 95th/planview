import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ImportsModule } from './imports/imports.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [AppComponent, RegistrationComponent, HomeComponent, LoginComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ImportsModule,
        JwtModule.forRoot({
            config: { tokenGetter },
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
