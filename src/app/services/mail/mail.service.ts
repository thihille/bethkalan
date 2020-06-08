import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    private http: HttpClient
  ) { }

  async sendCandidateEmail(data) {
    try {
      await this.http.post(environment.equipesDeLojaApi + 'mail/equipesdelojacandidatereturn', data).toPromise();
    } catch (e) {
      console.error(e);
    }
  }

  async sendCompanyEmail(data) {
    try {
      await this.http.post(environment.equipesDeLojaApi + 'mail/equipesdelojacompanyreturn', data).toPromise();
    } catch (e) {
      console.error(e);
    }
  }

  async sendBethKalanCanidateEmail(data) {
    try {
      await this.http.post(environment.equipesDeLojaApi + 'mail/equipesdelojacandidate', data).toPromise();
    } catch (e) {
      console.error(e);
    }
  }

  async sendBethKalanCompanyEmail(data) {
    try {
      await this.http.post(environment.equipesDeLojaApi + 'mail/equipesdelojacompany', data).toPromise();
    } catch (e) {
      console.error(e);
    }
  }
}
