import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { decodeToken } from '../../utils/token';
import 'moment/min/locales';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() showLogo;

  public mydate = null;
  public name: string = null;

  public items = [
    {
      label: 'Quem somos',
      url: '/quem-somos',
      privateRoute: false
    },
    {
      label: 'Para Empresas',
      url: '/para-empresas',
      privateRoute: false
    },
    {
      label: 'Buscar vagas',
      url: '/vagas',
      privateRoute: false
    },
    {
      label: 'Área do Candidato',
      url: '/dashboard',
      privateRoute: false
    }    
  ]

  constructor() {
    this.mydate = moment().locale('pt-br').format('LLLL');
    this.name = decodeToken() ? decodeToken().name : null;
  }

  ngOnInit() {
  }

}