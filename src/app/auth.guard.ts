import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService2 } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService2, private router: Router){}
 
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn) {
      return true;
  } 
  }
}
  

