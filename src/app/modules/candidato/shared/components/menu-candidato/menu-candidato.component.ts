import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/services/credentials/credentials.service';

@Component({
  selector: 'app-menu-candidato',
  template: `
  <div class="menu" fxLayout="column">
    <button mat-stroked-button color="primary" (click)="navigateTo('/dashboard')">Início</button>
    <button mat-stroked-button color="primary" (click)="navigateTo('/dashboard/perfil')">Dados cadastrais</button>
    <button mat-stroked-button color="primary" (click)="navigateTo('/dashboard/curriculos')">Meus currículos</button>
    <button mat-stroked-button color="primary" (click)="navigateTo('/dashboard/vagas-inscritas')">Vagas inscritas</button>
    <hr />
    <button mat-stroked-button color="primary" (click)="navigateTo('/vagas')">Visualizar vagas</button>
    <button mat-stroked-button (click)="logout()">Sair</button>
  </div>
  `,
  styles: [`
    button {
      width: 100%;
      max-width: 200px;
    }
  `]
})
export class MenuCandidatoComponent implements OnInit {

  constructor(private credentialService:CredentialsService, private router: Router) {}

  navigateTo(route){
    this.router.navigate([route])
  }

  ngOnInit() {}

  logout(){
    this.credentialService.disconnect();
  }
}
