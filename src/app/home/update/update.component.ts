import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { SelectService } from '../../services/select.service';
import { Country } from '../../services/country';
import { State } from '../../services/state';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateForm: FormGroup;
  isSubmitted=false;
  object2;
  details;
  uid;
  selectedCountry: Country = new Country(3, 'India');
  countries: Country[];
  states: State[];

  constructor(private _http: HttpClient,private selectService: SelectService,private commonService:CommonService,private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.countries = this.selectService.getCountries();
    this.onSelect(this.selectedCountry.id);

    this.updateForm = this.formBuilder.group({
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

    
    this._http
      .get("http://localhost:3000/users")
      .subscribe((result) => {
        this.object2=result;
        for(let items of this.object2){
          // this.object3.push(items);
          if(items.username==localStorage.getItem('ACCESS_TOKEN')){
            console.log(items);
            this.details=items;
          }
        }
      })
  }
  get formControls(){
    return this.updateForm.controls;
  }

  onSelect(countryid) {
    this.states = this.selectService.getStates().filter((item) => item.countryid == countryid);
  }

  submit(){
    if(this.updateForm.invalid){
      return;
    }
    console.log(this.details);
    var url="http://localhost:3000/users/"+this.details.id;
    console.log(url);
    this._http.put<any>(url, this.details).subscribe();
    this.isSubmitted = true;

    this.router.navigateByUrl('/updateSuccess');
  }


  loadedFeature = 'update';

  onNavigate(feature:string){
    this.loadedFeature = feature;
  }
  
  
}
