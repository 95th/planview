import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, JwtModule.forRoot({})],
        });
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
