import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { ImportsModule } from 'imports/imports.module';
import { CreateWorkTypeComponent } from './create-work-type.component';

describe('CreateWorkTypeComponent', () => {
    let component: CreateWorkTypeComponent;
    let fixture: ComponentFixture<CreateWorkTypeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateWorkTypeComponent],
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
        fixture = TestBed.createComponent(CreateWorkTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
