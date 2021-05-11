import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService2 } from '../../services/auth.service';
import { CommonService } from '../../services/common.service';

import { LoanComponent } from './loan.component';

describe('LoanComponent', () => {
  let component: LoanComponent;
  let fixture: ComponentFixture<LoanComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanComponent ],
      imports: [ HttpClientTestingModule , RouterTestingModule ],
      providers: [CommonService, AuthService2, FormBuilder]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(LoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should contain 15 fields in the form',()=>{
    expect(component.loanInfo.contains('loanType')).toBeTruthy();
    expect(component.loanInfo.contains('loanAmt')).toBeTruthy();
    expect(component.loanInfo.contains('applyDate')).toBeTruthy();
    expect(component.loanInfo.contains('rateOfInterest')).toBeTruthy();
    expect(component.loanInfo.contains('duration')).toBeTruthy();
    expect(component.loanInfo.contains('courseFee')).toBeTruthy();
    expect(component.loanInfo.contains('course')).toBeTruthy();
    expect(component.loanInfo.contains('fatherOcc')).toBeTruthy();
    expect(component.loanInfo.contains('experience')).toBeTruthy();
    expect(component.loanInfo.contains('rationCard')).toBeTruthy();
    expect(component.loanInfo.contains('fatherAnnualIncome')).toBeTruthy();
    expect(component.loanInfo.contains('annualIncome')).toBeTruthy();
    expect(component.loanInfo.contains('companyName')).toBeTruthy();
    expect(component.loanInfo.contains('designation')).toBeTruthy();
    expect(component.loanInfo.contains('perosnalExperience')).toBeTruthy();
  });
  
  it('should redirect the customer to the home page',()=>{
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigateByUrl');
    
    component.goToHome();
    
    expect(spy).toHaveBeenCalledWith('/welcome');
  });
  
  it('should set ROI 5 when loanType is Education',()=>{
    let value = component.optionValue = "Education";
    
    component.onSelect(value);
    fixture.detectChanges();
    
    expect(component.ROI).toBe('5');
  });
  
  it('should set ROI 8 when loanType is Personal',()=>{
    let value = component.optionValue = "Personal";
    
    component.onSelect(value);
    fixture.detectChanges();
    
    expect(component.ROI).toBe('8');
  });
  
  it('should call logout from authservice',()=>{
    let service = TestBed.get(AuthService2);
    let spy = spyOn(service, 'logout');
    
    component.onLogout();
    
    expect(spy).toHaveBeenCalled();
  });
  
  
  it('[Loan Applied Success Page Check]: Should redirect to success page',()=>{
    
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigateByUrl');
    component.submit();
    fixture.detectChanges();
    
    expect(spy).toHaveBeenCalledWith('/success');
  });
  
  it('[Navigation  to Loan Section Check]: Should redirect to corresponding page',()=>{
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigateByUrl');
    component.onNavigate('loan');
    fixture.detectChanges();
    expect(component.loadedFeature).toEqual('loan');
  });

  it('[Navigation  to Update Section Check]: Should redirect to corresponding page',()=>{
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigateByUrl');
    component.onNavigate('update');
    fixture.detectChanges();
    expect(component.loadedFeature).toEqual('update');
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