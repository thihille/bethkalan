import { Injectable } from '@angular/core';
import { Credentials } from 'src/app/model/login.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor(private http:HttpClient){}
  public getCredential(login: string, pass: string):Observable<any> {
    return this.http.post(environment.equipesDeLojaApi + 'auth/login', { email: login, password: pass});
  }

  public save(data){
    const myCredentials = data;
    window.localStorage.setItem('user', JSON.stringify(myCredentials));
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
}