import { Component, OnInit, ViewChild } from '@angular/core';
import { CredentialsService } from 'src/app/services/credentials/credentials.service';
import { getToken } from '../shared/utils/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private credentialsService: CredentialsService, private router: Router) {
    if(getToken()){
      console.log(this.router);
      this.router.navigate(['/dashboard'])
    }
  }

  public txtLogin: string = null;
  public txtPass: string = null;
  public txtEmail: string = null;
  public txtName: string = null;
  public txtCellphone: string = null;
  public txtCpf:string = null;
  public remember: boolean = false;

  private viewLogin: boolean = true;
  private viewForgotPassword: boolean = false;
  private viewContinueRegister: boolean = false;
  
  public forgotPassword: boolean = false;
  public continueRegister: boolean = false;

  ngOnInit(){  
    let setCredentials = this.credentialsService.getRemember();
    if(setCredentials){
      this.txtLogin = setCredentials.login;
      this.txtPass = setCredentials.pass;
      this.remember = true;
    }
  }

  handleViewLogin(){
    this.viewForgotPassword = false;
    this.viewContinueRegister = false;
    this.viewLogin = true;
  }
  handleViewForgotPassword(){
    this.viewForgotPassword = !this.viewForgotPassword;
    this.viewLogin = !this.viewLogin;
  }

  handleRemember(){
    this.remember = !this.remember;
  }

  getEmailRegister(){
    if(this.txtEmail){
      const newRegister = this.credentialsService.verifyAccount(this.txtEmail)
      this.viewContinueRegister = newRegister;
      this.viewLogin = !newRegister;
    };
  }

  getCredential(){
    if(this.txtLogin && this.txtPass){
      this.credentialsService.getCredential(this.txtLogin, this.txtPass).subscribe(data => {
        this.credentialsService.setRemember(this.txtLogin, this.txtPass, this.remember)
        this.credentialsService.save(data);
        window.location.reload();
      }, err => {
        this.credentialsService.setRemember(this.txtLogin, this.txtPass, false);
        console.log(err.status);
      })
    }else{
      alert('preencha os dados')
    }
  }

}
