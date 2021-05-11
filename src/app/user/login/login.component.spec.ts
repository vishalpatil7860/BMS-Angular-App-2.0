import { Location } from '@angular/common';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { materialize } from 'rxjs-compat/operator/materialize';
import { MaterialModule } from 'src/app/material.module';
import { AuthService2 } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;
  let service: AuthService2;
  let user : User;
  let dummy: LoginComponent;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        BrowserAnimationsModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        AuthModule.forRoot({
          domain: 'dev-t3f2xuti.us.auth0.com',
          clientId: 'Hfepwf0wHdV6J61jGTmZb7AqrZXZH0r1'
        }),
        RouterTestingModule
      ], 
      providers: [
        AuthService2,
        AuthService,
      ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  beforeEach(() => {
    component = new LoginComponent(null, null, null, new FormBuilder());
  });
  
  
  it('[Component Existence Check]: Should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  
  it('[Form Fields Check]: Should create a form with 2 controls', () => {
    expect(component.loginForm.contains('username')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });
  
  it('[Invalid Form Check]: Should be Invalid', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });
  
  it('[Invalid Email Check]: Should be Invalid', () => {
    let username = component.loginForm.controls['username'];
    expect(username.valid).toBeFalsy();
    
    let errors = {};
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();
  }); 
  
  it('[Invalid Password Check]: Should be Invalid', () => {
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
    
    let errors = {};
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
    component.loginForm.controls['password'].setValue("1234");
    expect(component.loginForm.valid).toBeFalsy();
    
  });
  
  it('[Form Validity Check]: should return true on valid input', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue("vishal123");
    component.loginForm.controls['password'].setValue("123456");
    expect(component.loginForm.valid).toBeTruthy();

  });

  it('[Prevent Login Check]: Should not log in the user if login info is invalid',()=>{
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigateByUrl');
    component.goToHome();
    expect(spy).not.toHaveBeenCalledOnceWith('/welcome')
    });

    it('should make the forms controls required', ()=>{
      let username = component.loginForm.get('username');
      let password = component.loginForm.get('password');

      username.setValue('');
      password.setValue('');

      expect(username.valid).toBeFalsy();
      expect(password.valid).toBeFalsy();
  });

  it('[Form Controls Get Check]: Get Form Controls from the form', () => {
    expect(component.formControls).toBe(component.loginForm.controls);
  });

  it('[Prevent Login Check]: Should not go to Welcome Page if Login  Form is invalid',async(()=>{
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigateByUrl');
    
    component.login();
    fixture.detectChanges();
    component.isSubmitted = true;
    
    expect(spy).not.toHaveBeenCalledWith('/welcome');
    component.invalidcredentials = true;

  }));

});
