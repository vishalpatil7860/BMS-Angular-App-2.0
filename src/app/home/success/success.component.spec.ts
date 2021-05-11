import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { HeaderComponent } from '../header/header.component';

import { SuccessComponent } from './success.component';

describe('SuccessComponent', () => {
  let component: SuccessComponent;
  let fixture: ComponentFixture<SuccessComponent>;
  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessComponent ,
      HeaderComponent],
      imports:[
        RouterTestingModule,
        HttpClientModule,
        AuthModule.forRoot({
          domain: 'dev-t3f2xuti.us.auth0.com',
          clientId: 'Hfepwf0wHdV6J61jGTmZb7AqrZXZH0r1'
        }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[Update Success Heading Check]: Should Display update success message', () => {
    expect(h1.textContent).toContain('Loan Application Submitted!')
  });
});
