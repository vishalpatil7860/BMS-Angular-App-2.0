import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';

import { AuthGuard } from './auth.guard';
import { AuthService2 } from './services/auth.service';
import { CommonService } from './services/common.service';


let router = {
  navigate: jasmine.createSpy('navigate')
}


describe('AuthGuard', () => {
  
  let guard: AuthGuard;
  let location: Location;
  
  
  
  
  
  beforeEach(() => {
    
  });
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterModule.forRoot([]),
        RouterTestingModule
      ],
      providers: [CommonService, AuthService2, FormBuilder,
        { provide: Router, useValue: router }]
      });
      guard = TestBed.inject(AuthGuard);
    });
    
    it('[Auth Guard Initialization]: Should Create Auth Guard.', fakeAsync(() => {
      expect(guard).toBeTruthy();
    }));
    
    
    it('be able to hit route when user is logged in', () => {
      
      localStorage.isLoggedIn = true;
      expect(guard.canActivate()).toBe(true);
    
  });
  
  
});
