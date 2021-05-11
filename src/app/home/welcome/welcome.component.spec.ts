import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { HeaderComponent } from '../header/header.component';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let h1 : HTMLElement;
  let p : HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ,
      HeaderComponent],
      imports:[
        RouterTestingModule,
        HttpClientModule,
        AuthModule.forRoot({
          domain: 'dev-t3f2xuti.us.auth0.com',
          clientId: 'Hfepwf0wHdV6J61jGTmZb7AqrZXZH0r1'
        }),
      ],
      providers: [
        AuthService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');
    p = fixture.nativeElement.querySelector('p');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should display welcome heading', () => {
    // expect(h1.textContent).toContain('Welcome ' + user.name + '!');
    expect(p.textContent).toContain('IBMS - One stop to apply for a Loan!!!');
  });

  it('[Navigation  to Update Section Check]: Should redirect to corresponding page',()=>{
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigateByUrl');
    component.onNavigate('update');
    fixture.detectChanges();
    expect(component.loadedFeature).toEqual('update');
  });

  it('[Navigation  to Loan Section Check]: Should redirect to corresponding page',()=>{
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigateByUrl');
    component.onNavigate('loan');
    fixture.detectChanges();
    expect(component.loadedFeature).toEqual('loan');
  });

  it('[Navigation  to Home Section Check]: Should redirect to corresponding page',()=>{
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigateByUrl');
    component.onNavigate('welcome');
    fixture.detectChanges();
    expect(component.loadedFeature).toEqual('welcome');
  });

  it('[Navigation  to Loan Section Check]: Should redirect to corresponding page',()=>{
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigateByUrl');
    component.onNavigate('logout');
    fixture.detectChanges();
    expect(component.loadedFeature).toEqual('logout');
  });
  
});
