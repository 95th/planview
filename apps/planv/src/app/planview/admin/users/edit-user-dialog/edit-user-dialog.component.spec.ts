import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { ImportsModule } from 'imports/imports.module';
import { EditUserDialogComponent } from './edit-user-dialog.component';

describe('EditUserDialogComponent', () => {
    let component: EditUserDialogComponent;
    let fixture: ComponentFixture<EditUserDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditUserDialogComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                ImportsModule,
                BrowserAnimationsModule,
                JwtModule.forRoot({}),
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditUserDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
