import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService2 {
  [x: string]: any;
  
  cid1;
  object2;
  
  
  
  constructor(private _http:HttpClient,private router: Router) { }
  
  public login(userInfo: User){
    
    this._http
    .get("http://localhost:3000/users")
    .subscribe((result) => {
      this.object2=result;
      for(let items of this.object2){
        if(items.username==userInfo['username'] && items.password==userInfo['password']){
          console.log("ok");
          localStorage.setItem('ACCESS_TOKEN', items.username);
          localStorage.setItem('CID', items.cid);
          this.router.navigateByUrl('/welcome');
        }
      }
      return false;
    })
    
  }
  
  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  
  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
  
  public cust(cid){
    this.cid1=cid;
  }
  
}
