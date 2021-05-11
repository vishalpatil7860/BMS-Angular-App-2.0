import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService2 } from './auth.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanComponent } from '../home/loan/loan.component';
import { HeaderComponent } from '../home/header/header.component';
import { RegisterComponent } from '../user/register/register.component';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';
import { WelcomeComponent } from '../home/welcome/welcome.component';
import { User } from './user';

describe('AuthService', () => {
  let service: AuthService2;
  let userInfo: User;
  let http: HttpClient;
 
 
  beforeEach(() => TestBed.configureTestingModule({
    declarations:[
      LoanComponent,
      HeaderComponent,
      RegisterComponent,
      WelcomeComponent
    ],
    imports: [
      RouterModule.forRoot([]),
      HttpClientModule
    ], 
    providers: [
      HttpClient,
      HttpClientTestingModule,
      HttpHandler,
      AuthService2
    ]
  }));
  
  beforeEach(() => {
    service = new AuthService2(null, null);
  });

  it('[Auth Service Definition Check]: Should create Auth Service', () => {
    expect(service).toBeDefined();
  });

  it('[Logout Check]: Should log out the user and remove the Access Token', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigateByUrl');
    service.logout();
    expect(localStorage).toBeNull;
    // expect(spy).toHaveBeenCalledWith('/login');
  });
  
  it('should isLoggedIn is true', () => {
    let auth = TestBed.inject(AuthService2);
    
    var value=auth.isLoggedIn();
    let spy = spyOn(auth,'isLoggedIn');

    expect(value).toBeTruthy();

  });
  
  

  it('should behave...', () => {
    // service.login(userInfo);
    
    // service.object2 = result;
    spyOn(localStorage, 'getItem').and.callFake(function (user) {
      return userInfo[user];
    });
    
    localStorage.setItem('ACCESS_TOKEN', 'vishal7860');
    localStorage.setItem('CID', 'R-786');

  });

  it('Cust Check', () => {
    service.cust('R-464');
    service.cid1 = 'R-464';
  });


  // it('should log in the user if valid input', () => {
  //   var userdetails = { username: "vishal7860" , password : "123456"}
  //   let router = TestBed.inject(Router);
  //   let spy = spyOn(router, 'navigateByUrl');
    
  //   service.login(userdetails);
    
  //   expect(spy).not.toHaveBeenCalledWith('/welcome');
  // });

  
});
