import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService2 } from 'src/app/services/auth.service';
import { User } from  'src/app/services/user';
import { DateAdapter } from '@angular/material/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(public authService: AuthService2,public auth: AuthService, private router: Router, private formBuilder: FormBuilder) { 

    this.loginForm  =  this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }
  
  loginForm: FormGroup;
  isSubmitted  =  false;
  invalidcredentials = false;
  
  ngOnInit() {

  }

  get formControls() { return this.loginForm.controls; }
  
  goToHome() {
    if(this.loginForm.invalid){
      return;
    }
   this.authService.login(this.loginForm.value);
  }

  login(){
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value);
    this.invalidcredentials=true;
  }

}
