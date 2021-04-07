import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { ImportsModule } from 'imports/imports.module';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegistrationComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                ImportsModule,
                BrowserAnimationsModule,
                JwtModule.forRoot({}),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
