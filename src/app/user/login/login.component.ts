import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from  'src/app/services/user';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(public authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }
  
  loginForm: FormGroup;
  isSubmitted  =  false;
  invalidcredentials = false;
  
  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get formControls() { return this.loginForm.controls; }
  
  login(){
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value);
    this.invalidcredentials=true;
    this.router.navigateByUrl('/welcome');
  }


}
