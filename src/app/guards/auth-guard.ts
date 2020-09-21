import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CredentialsService } from '../services/credentials/credentials.service';
import { getToken } from '../shared/utils/token';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authUser: CredentialsService, private router: Router) { }
  private isAuthenticated: boolean = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {
    
    if(getToken()){
      return true;
    }

    this.router.navigate(['/login'])
    return false;
  }
}