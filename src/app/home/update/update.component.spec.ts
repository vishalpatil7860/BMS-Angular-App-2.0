import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonService } from 'src/app/services/common.service';
import { SelectService } from 'src/app/services/select.service';

import { UpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateComponent ],
      imports: [HttpClientTestingModule,
        RouterTestingModule
      ], 
        providers: [SelectService,CommonService,FormBuilder,
        HttpClient]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 24 controls',() =>{
    expect(component.updateForm.contains('name')).toBeTruthy();
    expect(component.updateForm.contains('username')).toBeTruthy();
    expect(component.updateForm.contains('password')).toBeTruthy();
    expect(component.updateForm.contains('guardiantype')).toBeTruthy();
    expect(component.updateForm.contains('gname')).toBeTruthy();
    expect(component.updateForm.contains('address')).toBeTruthy();
    expect(component.updateForm.contains('citizenship')).toBeTruthy();
    expect(component.updateForm.contains('inputCountry')).toBeTruthy();
    expect(component.updateForm.contains('state')).toBeTruthy();
    expect(component.updateForm.contains('email')).toBeTruthy();
    expect(component.updateForm.contains('gender')).toBeTruthy();
    expect(component.updateForm.contains('maritialstatus')).toBeTruthy();
    expect(component.updateForm.contains('contact')).toBeTruthy();
    expect(component.updateForm.contains('dob')).toBeTruthy();
    expect(component.updateForm.contains('registerDate')).toBeTruthy();
    expect(component.updateForm.contains('accountType')).toBeTruthy();
    expect(component.updateForm.contains('branch')).toBeTruthy();
    expect(component.updateForm.contains('citizen')).toBeTruthy();
    expect(component.updateForm.contains('deposit')).toBeTruthy();
    expect(component.updateForm.contains('prooftype')).toBeTruthy();
    expect(component.updateForm.contains('docnumber')).toBeTruthy();
    expect(component.updateForm.contains('refername')).toBeTruthy();
    expect(component.updateForm.contains('refernumber')).toBeTruthy();
    expect(component.updateForm.contains('referaddress')).toBeTruthy();

  });

  it('should not go to success page if updateForm is Invalid',()=>{
    let router = TestBed.inject(Router);
    let spy = spyOn(router, "navigateByUrl");
    
    component.submit();
    expect(spy).not.toHaveBeenCalledWith('/success');
  }); 

  it('[Form Controls Get Check]: Get Form Controls from the form', () => {
    expect(component.formControls).toBe(component.updateForm.controls);
  });

  it('[Conutry Selection]: should return specific states when country is selected',()=>{
    component.onSelect("1");
    fixture.detectChanges();
   
    expect(component.states.length).toBe(4);
  });


  it('[Prevent Login Check]: Should not go to login if Register Form is invalid',async(()=>{
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigateByUrl');
    
    
    expect(spy).not.toHaveBeenCalledWith('/login');
    fixture.detectChanges();
    // var url = "http://localhost:3000/users/" + component.details.id;
    // fixture.detectChanges();
    // // component._http.put(url, component.details).subscribe();
    // component.isSubmitted = true;
    

   
    component.isSubmitted = true;
    fixture.detectChanges();

    component.submit();
    // expect(spy).toHaveBeenCalledOnceWith('/updateSuccess');


  }));

  it('[Profile Update Success Page Check]: Should redirect to success page',()=>{
    
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigateByUrl');
    component.submit();
    fixture.detectChanges();
    
    component.updateForm.controls['name'].setValue('Vishal');
    component.updateForm.controls['username'].setValue('vp7860');
    component.updateForm.controls['password'].setValue('123456');
    component.updateForm.controls['guardiantype'].setValue('Father');
    component.updateForm.controls['gname'].setValue('Tejrao');
    component.updateForm.controls['address'].setValue('Pune');
    component.updateForm.controls['citizenship'].setValue('Indian');
    component.updateForm.controls['inputCountry'].setValue('India');
    component.updateForm.controls['state'].setValue('Maharashtra');
    component.updateForm.controls['email'].setValue('vp@gmail.com');
    component.updateForm.controls['gender'].setValue('Male');
    component.updateForm.controls['maritialstatus'].setValue('Unmarried');
    component.updateForm.controls['contact'].setValue('9090909090');
    component.updateForm.controls['dob'].setValue('23-10-1998');
    component.updateForm.controls['registerDate'].setValue('11-05-2021');
    component.updateForm.controls['accountType'].setValue('Savings');
    component.updateForm.controls['branch'].setValue('Hadapsar');
    component.updateForm.controls['citizen'].setValue('Normal');
    component.updateForm.controls['deposit'].setValue('5000');
    component.updateForm.controls['prooftype'].setValue('Pan card');
    component.updateForm.controls['docnumber'].setValue('AA11AA11AA11');
    component.updateForm.controls['refername'].setValue('Deepa');
    component.updateForm.controls['refernumber'].setValue('123456789');
    component.updateForm.controls['referaddress'].setValue('Pune');
    component.updateForm.controls['id'];
    component.submit();

    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('/updateSuccess');
  });

  it('[Navigation  to Loan Section Check]: Should redirect to corresponding page',()=>{
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigateByUrl');
    component.onNavigate('update');
    fixture.detectChanges();
    expect(component.loadedFeature).toEqual('update');
  });


});