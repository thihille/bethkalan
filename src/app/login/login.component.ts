import { Component, OnInit } from '@angular/core';
import { CredentialsService } from 'src/app/services/credentials/credentials.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private credentialsService: CredentialsService) { }

  public txtLogin: string = null;
  public txtPass: string = null;
  public remember: boolean = false;
  public forgotPassword: boolean = false;

  ngOnInit(){
    let setCredentials = this.credentialsService.getRemember();
    if(setCredentials){
      this.txtLogin = setCredentials.login;
      this.txtPass = setCredentials.pass;
      this.remember = true;
    }
    let data = window.localStorage.getItem('user');
    
    console.log(atob(data))
  }

  handleRemember(){
    this.remember = !this.remember;
  }

  getCredential(){
    if(this.txtLogin && this.txtPass){
      this.credentialsService.getCredential(this.txtLogin, this.txtPass).subscribe(data => {
        this.credentialsService.setRemember(this.txtLogin, this.txtPass, this.remember)
        this.credentialsService.save(data);
      }, err => {
        this.credentialsService.setRemember(this.txtLogin, this.txtPass, false);
        console.log(err.status);
      })
    }else{
      alert('preencha os dados')
    }
  }

}
