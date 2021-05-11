import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { HeaderComponent } from '../header/header.component';

import { UpdateSuccessComponent } from './update-success.component';

describe('UpdateSuccessComponent', () => {
  let component: UpdateSuccessComponent;
  let fixture: ComponentFixture<UpdateSuccessComponent>;
  let h1 : HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSuccessComponent,
      HeaderComponent
     ],
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
    fixture = TestBed.createComponent(UpdateSuccessComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display update success heading', () => {
    expect(h1.textContent).toContain('Profile Update Successfully!!');
  });
});
