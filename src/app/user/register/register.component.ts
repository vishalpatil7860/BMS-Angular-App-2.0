import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { AuthService2 } from 'src/app/services/auth.service';
import { Country } from '../../services/country';
import { SelectService } from '../../services/select.service';
import { State } from '../../services/state';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService2,private commonService: CommonService,private selectService: SelectService, private router: Router,private formBuilder: FormBuilder) { }

  isSubmitted = false;
  isValid = true;
  
  selectedCountry: Country = new Country(3, 'India');
  countries: Country[];
  states: State[];
  cid;
  registerForm: FormGroup;
  date = new Date;
  age;

  formGroup: FormGroup;
  
  ngOnInit(): void {
    this.countries = this.selectService.getCountries();
    this.onSelect(this.selectedCountry.id);

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      username: ['',[Validators.required, Validators.minLength(4)]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      guardiantype: ['', Validators.required],
      gname: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      citizenship: ['', Validators.required],
      inputCountry: ['', Validators.required],
      state: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      maritialstatus: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      dob: ['', Validators.required],
      registerDate: [(new Date()).toISOString().substring(0,10),Validators.required],
      accountType: ['', Validators.required],
      branch: ['', Validators.required],
      citizen: ['', Validators.required],
      deposit: ['', Validators.required],
      prooftype: ['', Validators.required],
      docnumber: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{12}$')]],
      refername: ['', Validators.required],
      refernumber: ['', Validators.required],
      referaddress: ['', Validators.required]
    }); 

   
  }
  get formControls(){
    return this.registerForm.controls;
  } 

  addUser(formObj){
    console.log(formObj);
    this.commonService.createUser(formObj).subscribe((response)=>{
      console.log("user added");
    })
  }

  onSelect(countryid) {
    this.states = this.selectService.getStates().filter((item) => item.countryid == countryid);
  }

  onDate(dob){
    var date1 = new Date(dob);
    var date2 = new Date(); 
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    this.age=Math.round(Difference_In_Days/360);
    console.log(this.age);

    if(this.age<18){
      this.registerForm.patchValue({citizen: 'Minor'});
    }
    else if(this.age>18 && this.age<=60){
      this.registerForm.patchValue({citizen: 'Normal'});
    }
    else{
      this.registerForm.patchValue({citizen: 'Senior'});
    }
  }

  onAccountType(accType){
    if(accType === 'saving'){
      this.registerForm.patchValue({deposit: "5000"});
    }
    if(accType ==='salary'){
      this.registerForm.patchValue({deposit: "0"});
    }
  }
  
  // goToLogin() {
  //   console.log(this.registerForm.value)
  //   if(this.registerForm.invalid)
  //     return;
  //   this.commonService.createUser(this.registerForm.value).subscribe((response)=>{
  //       console.log("Customer has been registered")
  //   })
  //   this.router.navigateByUrl("/login")
  // }

  submit(){
    this.addUser(this.registerForm.value);
    this.isSubmitted = true;
    if(this.registerForm.invalid){
      return;
    }
    this.router.navigateByUrl('/login');
  }

}
