import { Injectable } from '@angular/core';
import { Credentials } from '../../models/login.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor(private http:HttpClient, private router:Router){}

  private authUser: boolean = false;

  public getCredential(login: string, pass: string):Observable<any> {
    return this.http.post(environment.equipesDeLojaApi + 'auth/login', { email: login, password: pass});
  }

  public save(res){

    const { token } = res.data;
    window.localStorage.setItem('user', token);
    this.authUser = true;
  }

  public setRemember(login: string, pass: string, save: boolean){
    const rememberCredentials = {
      login: login, 
      pass: pass
    }
    save ? window.localStorage.setItem('remember', btoa(JSON.stringify(rememberCredentials))) : this.cleanRemember();
  }
  
  public getRemember(){
    const rememberCredentials = window.localStorage.getItem('remember');
    if(rememberCredentials){
      return JSON.parse(atob(localStorage.getItem('remember')));
    }
  }

  public cleanRemember(){
    const rememberCredentials = window.localStorage.getItem('remember');
    if(rememberCredentials){
      window.localStorage.removeItem('remember');
    }
  }

  public verifyAccount(email){
    return true;
  }

  public verifyIsAuth(){
    return this.authUser;
  }

  public disconnect(){
    window.localStorage.removeItem('user');
    window.location.reload();
  }

  public redirectUser(userType: string){
    if(userType == "Candidato" || userType == "Admin"){
      this.router.navigate(['/area-do-candidato'])
    }else if(userType == "empresa"){
      this.router.navigate(["/admin-empresa"]);
    }else {
      return false;
    }
  }
}