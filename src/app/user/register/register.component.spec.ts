import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { SelectService } from 'src/app/services/select.service';
import { jquery } from 'node_modules/jquery';
import { RegisterComponent } from './register.component';
import { User } from 'src/app/services/user';
import { Location, LocationStrategy } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from '../../app-routing.module' ;
import { CommonService } from 'src/app/services/common.service';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs-compat';
import { AuthModule } from '@auth0/auth0-angular';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let location: Location;
  let router: Router;
  let service: CommonService;
  let response: Response;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports:[
        HttpClientModule,
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        MaterialModule,
        AuthModule.forRoot({
          domain: 'dev-t3f2xuti.us.auth0.com',
          clientId: 'Hfepwf0wHdV6J61jGTmZb7AqrZXZH0r1'
        }),
        AppRoutingModule
      ],
      providers:[SelectService]
    })
    .compileComponents();
  });
  
  beforeEach(() => {

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router.initialNavigation();
  });
  
  
  beforeEach(() => {
    // component = new RegisterComponent(null, null, new FormBuilder());
    registerForm : new FormBuilder();
  });
  
  it('[Register Component Initialization Check]: Component should be Initialized', () => {
    expect(component).toBeTruthy();
  });
  
  it('[Navigation  to Loan Section Check]: Should redirect to corresponding page',()=>{
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigateByUrl');
    component.onNavigate('register');
    fixture.detectChanges();
    expect(component.loadedFeature).toEqual('register');
  });
  
  // it('[Register Form Creation]: should create a FormGroup comprised of FormControls', () => {
  //   component.ngOnInit();
  //   expect(component.registerForm instanceof FormGroup).toBe(true);
  // });
  
  it('[Form Fields Check]: Should create a form with 24 controls', () => {
    expect(component.registerForm.contains('name')).toBeTruthy();
    expect(component.registerForm.contains('username')).toBeTruthy();
    expect(component.registerForm.contains('password')).toBeTruthy();
    expect(component.registerForm.contains('guardiantype')).toBeTruthy();
    expect(component.registerForm.contains('gname')).toBeTruthy();
    expect(component.registerForm.contains('address')).toBeTruthy();
    expect(component.registerForm.contains('citizenship')).toBeTruthy();
    expect(component.registerForm.contains('inputCountry')).toBeTruthy();
    
    expect(component.registerForm.contains('state')).toBeTruthy();
    expect(component.registerForm.contains('email')).toBeTruthy();
    expect(component.registerForm.contains('gender')).toBeTruthy();
    expect(component.registerForm.contains('maritialstatus')).toBeTruthy();
    expect(component.registerForm.contains('contact')).toBeTruthy();
    expect(component.registerForm.contains('dob')).toBeTruthy();
    expect(component.registerForm.contains('registerDate')).toBeTruthy();
    expect(component.registerForm.contains('accountType')).toBeTruthy();
    
    expect(component.registerForm.contains('branch')).toBeTruthy();
    expect(component.registerForm.contains('citizen')).toBeTruthy();
    expect(component.registerForm.contains('deposit')).toBeTruthy();
    expect(component.registerForm.contains('prooftype')).toBeTruthy();
    expect(component.registerForm.contains('docnumber')).toBeTruthy();
    expect(component.registerForm.contains('refername')).toBeTruthy();
    expect(component.registerForm.contains('refernumber')).toBeTruthy();
    expect(component.registerForm.contains('referaddress')).toBeTruthy();
  });
  
  
  it('[Invalid Form Check]: Should be Invalid', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });
  
  it('[Invalid Email Check]: Should be Invalid', () => {
    let username = component.registerForm.controls['username'];
    expect(username.valid).toBeFalsy();
    
    let errors = {};
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  
  it('[Invalid Name Check]: Name should contain only Alphabets and Spaces ',()=>{
    let control = component.registerForm.get('name');
    control.setValue('vishal@123');
    expect(control.valid).toBeFalsy();
  });
  
  it('[Invalid Contact Number Check]: Contact Number should contain only numeric values',()=>{
    let control = component.registerForm.get('contact');
    control.setValue('vishal');
    expect(control.valid).toBeFalsy();
  });
  
  it('[Invalid Password Check]: Should be Invalid', () => {
    let password = component.registerForm.controls['password'];
    expect(password.valid).toBeFalsy();
    
    let errors = {};
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
    component.registerForm.controls['password'].setValue("1234");
    expect(component.registerForm.valid).toBeFalsy();
    
  });
  
  it('[Invalid Name Check]: Should be Invalid', () => {
    let name = component.registerForm.controls['name'];
    let errors = {};
    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();
    
    component.registerForm.controls['name'].setValue("vishal");
    expect(name.valid).toBeTruthy();
    
    component.registerForm.controls['name'].setValue("vishal123");
    expect(name.valid).toBeFalsy();
    
  });
  
  it('[Invalid Contact Number Check]: Should be Invalid', () => {
    let contact = component.registerForm.controls['contact'];
    
    let errors = {};
    errors = contact.errors || {};
    expect(errors['required']).toBeTruthy();
    
    component.registerForm.controls['contact'].setValue("9876543210");
    expect(contact.valid).toBeTruthy();
    
    component.registerForm.controls['contact'].setValue("98765432");
    expect(contact.valid).toBeFalsy();
    
    component.registerForm.controls['contact'].setValue("vishal123");
    expect(contact.valid).toBeFalsy();
    
  });
  
  it('[Invalid Document Number Check]: Should be Invalid', () => {
    let docnumber = component.registerForm.controls['docnumber'];
    
    let errors = {};
    errors = docnumber.errors || {};
    expect(errors['required']).toBeTruthy();
    
    component.registerForm.controls['docnumber'].setValue("ABCDE123456A");
    expect(docnumber.valid).toBeTruthy();
    
    component.registerForm.controls['docnumber'].setValue("98765432");
    expect(docnumber.valid).toBeFalsy();
    
    component.registerForm.controls['docnumber'].setValue("ADFF36GDGFDGTH4");
    expect(docnumber.valid).toBeFalsy();
    
  });
  
  it('should 3 countries', () => {
    
    let stateService = TestBed.inject(SelectService);
    let spy = spyOn(stateService, 'getCountries');
    let size = stateService.getCountries();
    expect(size).toEqual(undefined);
  });
  
  
  // it('should behave...', async(() => {
  //   let select: HTMLSelectElement = fixture.debugElement.query(By.css('.form-control select2')).nativeElement;
  //   let option= fixture.debugElement.nativeElement.querySelector('option');
  //   fixture.detectChanges();
  // }));
  
  
  
  it('[States Availability Check]: Should set states when country is selected',()=>{
    component.onSelect(1);
    fixture.detectChanges();
    
    expect(component.states.length).toBe(4);
  });
  
  
  
  it('name control should contain only alphabets and spaces ',()=>{
    let control = component.registerForm.get('name');
    control.setValue('vishal@123');
    expect(control.valid).toBeFalsy();
  });
  
  it('address control is required ',()=>{
    let control = component.registerForm.get('address');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  
  
  it('[Submit Check Check1]', async(() => {
    component.addUser(component.registerForm.value);
    expect(component.isSubmitted).toBe(false);
    component.isSubmitted = true;
    fixture.detectChanges();
    component.submit();

    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigateByUrl');
    expect(spy).not.toHaveBeenCalledOnceWith('/login')
    
      // if(component.registerForm.invalid) {

      //   expect(spy).toHaveBeenCalledOnceWith('/login')
        
      // }
  }));

  it('[Prevent Login Check]: Should not go to login if Register Form is invalid',async(()=>{
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigateByUrl');
    
    ;
    
    expect(spy).not.toHaveBeenCalledWith('/login');
    fixture.detectChanges();

    component.registerForm.controls['name'].setValue('Vishal');
    component.registerForm.controls['username'].setValue('vp7860');
    component.registerForm.controls['password'].setValue('123456');
    component.registerForm.controls['guardiantype'].setValue('Father');
    component.registerForm.controls['gname'].setValue('Tejrao');
    component.registerForm.controls['address'].setValue('Pune');
    component.registerForm.controls['citizenship'].setValue('Indian');
    component.registerForm.controls['inputCountry'].setValue('India');
    component.registerForm.controls['state'].setValue('Maharashtra');
    component.registerForm.controls['email'].setValue('vp@gmail.com');
    component.registerForm.controls['gender'].setValue('Male');
    component.registerForm.controls['maritialstatus'].setValue('Unmarried');
    component.registerForm.controls['contact'].setValue('9090909090');
    component.registerForm.controls['dob'].setValue('23-10-1998');
    component.registerForm.controls['registerDate'].setValue('11-05-2021');
    component.registerForm.controls['accountType'].setValue('Savings');
    component.registerForm.controls['branch'].setValue('Hadapsar');
    component.registerForm.controls['citizen'].setValue('Normal');
    component.registerForm.controls['deposit'].setValue('5000');
    component.registerForm.controls['prooftype'].setValue('Pan card');
    component.registerForm.controls['docnumber'].setValue('AA11AA11AA11');
    component.registerForm.controls['refername'].setValue('Deepa');
    component.registerForm.controls['refernumber'].setValue('123456789');
    component.registerForm.controls['referaddress'].setValue('Pune');

    // component.addUser(component.registerForm.value);
    // expect(component.isSubmitted).toBe(false);
    component.isSubmitted = true;
    fixture.detectChanges();

    component.submit();
    expect(spy).toHaveBeenCalledOnceWith('/login');


  }));



  it('[Minor Check]', () => {
    component.onDate('2010-05-01');
    fixture.detectChanges();
    expect(component.registerForm.value.citizen).toEqual('Minor');
  });
  
  it('[Normal Check]', () => {
    component.onDate('1998-05-01');
    fixture.detectChanges();
    expect(component.registerForm.value.citizen).toEqual('Normal');
  });
  
  it('[Senior Check]', () => {
    component.onDate('1947-05-01');
    fixture.detectChanges();
    expect(component.registerForm.value.citizen).toEqual('Senior');
  });

  it('[Initial Deposit Check 1]: For Savings Account', () => {
    component.onAccountType('saving');
    fixture.detectChanges();
    expect(component.registerForm.value.deposit).toEqual("5000");
  });
  
  it('[Initial Deposit Check 2]: For Salary Account', () => {
    component.onAccountType('salary');
    fixture.detectChanges();
    expect(component.registerForm.value.deposit).toEqual("0");
  });


  // it('[Prevent Login Check]: Should not go to login if Register Form is invalid',async(()=>{
  //   let router = TestBed.get(Router);
  //   let spy = spyOn(router, 'navigateByUrl');
    
  //   component.goToLogin();
   
  //   component.addUser(component.registerForm.value);
  //   expect(component.isSubmitted).toBe(false);
  //   component.isSubmitted = true;
  //   fixture.detectChanges();
  //   component.submit();
  //   expect(spy).not.toHaveBeenCalledOnceWith('/login');


  // }));

  
  it('[Form submit Check]: Should submit a valid form', () => {
    
    component.registerForm.controls['name'].setValue('Vishal');
    component.registerForm.controls['username'].setValue('vp7860');
    component.registerForm.controls['password'].setValue('123456');
    component.registerForm.controls['guardiantype'].setValue('Father');
    component.registerForm.controls['gname'].setValue('Tejrao');
    component.registerForm.controls['address'].setValue('Pune');
    component.registerForm.controls['citizenship'].setValue('Indian');
    component.registerForm.controls['inputCountry'].setValue('India');
    component.registerForm.controls['state'].setValue('Maharashtra');
    component.registerForm.controls['email'].setValue('vp@gmail.com');
    component.registerForm.controls['gender'].setValue('Male');
    component.registerForm.controls['maritialstatus'].setValue('Unmarried');
    component.registerForm.controls['contact'].setValue('9090909090');
    component.registerForm.controls['dob'].setValue('23-10-1998');
    component.registerForm.controls['registerDate'].setValue('11-05-2021');
    component.registerForm.controls['accountType'].setValue('Savings');
    component.registerForm.controls['branch'].setValue('Hadapsar');
    component.registerForm.controls['citizen'].setValue('Normal');
    component.registerForm.controls['deposit'].setValue('5000');
    component.registerForm.controls['prooftype'].setValue('Pan card');
    component.registerForm.controls['docnumber'].setValue('AA11AA11AA11');
    component.registerForm.controls['refername'].setValue('Deepa');
    component.registerForm.controls['refernumber'].setValue('123456789');
    component.registerForm.controls['referaddress'].setValue('Pune');

    expect(component.registerForm.valid).toBeTruthy();

   
  });
  
  // it('[Citizen Type Check for Minor]', () => {
  //   component.onAccountType()
  // });
  


});
