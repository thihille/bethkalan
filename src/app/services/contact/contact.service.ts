import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  public async sendCompanyContact(companyData) {
    try {
      const result = await this.http.post(environment.equipesDeLojaApi + 'equipedeloja/savecompanycontact', companyData).toPromise();
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}
