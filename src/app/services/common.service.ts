import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _http:HttpClient) { }

  createUser(user){
    
    user['cid']='R-'+Math.floor(Math.random()*(999-100+1)+100);
    return this._http.post("http://localhost:3000/users", user);
  }

}
