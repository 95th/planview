import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ImportsModule } from 'imports/imports.module';
import { MessagesComponent } from './messages.component';

describe('MessageComponent', () => {
    let component: MessagesComponent;
    let fixture: ComponentFixture<MessagesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessagesComponent],
            imports: [HttpClientTestingModule, RouterTestingModule, ImportsModule, BrowserAnimationsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
