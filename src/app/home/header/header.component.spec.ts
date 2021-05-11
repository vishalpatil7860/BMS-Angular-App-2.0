import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent, ],
      imports: [
        RouterModule.forRoot([]),
        AuthModule.forRoot({
          domain: 'dev-t3f2xuti.us.auth0.com',
          clientId: 'Hfepwf0wHdV6J61jGTmZb7AqrZXZH0r1'
        }),
      ],
      providers: [
        HttpClient,
        HttpHandler,
        
        
      ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('[Header Component Initialization Check]: Should create Header Component.', () => {
    expect(component).toBeDefined();
  });
  
  
  it('[Loan Section Redirect Check]: Should redirect the User to the Loan Section.',()=>{
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigateByUrl');
    
    component.goToLoan();
    
    expect(spy).toHaveBeenCalledWith('/loan');
  });
  

  it('[Update Section Redirect Check]: Should redirect the User to the Update Section.',()=>{
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigateByUrl');
    
    component.goToUpdate();
    
    expect(spy).toHaveBeenCalledWith('/update');
  });


  it('[Home Redirect Check]: Should redirect the User to the Home Page when clicked on Logo.',()=>{
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigateByUrl');
    
    component.goToHome();
    
    expect(spy).toHaveBeenCalledWith('/welcome');
  });
  
  it('should go to login page after logout button clicked',()=>{
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigateByUrl');
  
    component.logout();
    fixture.detectChanges();
  
    expect(spy).toHaveBeenCalledWith('/login'); 
  });

 
});
