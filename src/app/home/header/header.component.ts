import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AuthService2 } from 'src/app/services/auth.service';
import { MaterialModule } from '../../material.module';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService2,@Inject(DOCUMENT) public document: Document, public auth: AuthService, private router: Router) { }

  
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  
  goToLoan() {
    this.router.navigateByUrl("/loan")
  }
  
  goToHome() {
    this.router.navigateByUrl("/welcome")
  }

  goToUpdate() {
    this.router.navigateByUrl("/update")
  }

  ngOnInit(): void {

  }


}
