import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  loanForm: FormGroup;
  isSubmitted=false;
  preOption;
  duration;
  date = new Date;
  cid;

  constructor(public authService: AuthService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.cid=localStorage.getItem('CID');

    this.loanForm  =  this.formBuilder.group({
      loantype: ['', Validators.required],
      loanamount: ['', Validators.required],
      loanApplyDate: ['', Validators.required],
      loanIssueDate: ['', Validators.required],
      rate: ['', Validators.required],
      loanDuration: ['', Validators.required],

  });
  }

  get formControls() { return this.loanForm.controls; }

  loadedFeature = 'loan';
  
  onNavigate(feature:string){
    this.loadedFeature = feature;
  }

  submit(){
    console.log(this.loanForm.value);
    this.isSubmitted = true;
    if(this.loanForm.invalid){
      return;
    }
    this.router.navigateByUrl('/success');
  }
}
