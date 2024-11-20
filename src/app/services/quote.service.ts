import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  url = 'https://estatenest.capital/restapi/';

  constructor(public http: HttpClient) { }


  basicInfo(form: any) {
    var smoker = form.smoker.value == 'y' ? true : false;
    let formData: any = new FormData;
    formData.append("name", form['name'].value);
    formData.append("Email", form['email'].value);
    formData.append("Phone", form['phone'].value);
    formData.append("gender", form['gender'].value);
    formData.append("dob", form['dob'].value);
    formData.append("is_smoker", smoker);
    formData.append("cov", form['cov'].value);
    formData.append("state", form['resStatus'].value);

    return this.http.post<any>(this.url + 'create/quote', formData);
  }

  medCondition(form: any) {
    let heit = form.heitFt.value + '.' + form.heitInc.value;
    let weit = form.weight.value + ' ' + form.weitMsr.value;
    let cigType = "";
    form['tobaccoUseType'].value.forEach((e: any, i: number) => {
      cigType += e["item_text"] + ",";
    });

    let id = localStorage.getItem('basicInfoId');

    let formData: any = new FormData;
    formData.append("height", heit);
    formData.append("weight", weit);
    formData.append("tobacco", cigType);
    formData.append("bp", form['bp'].value);
    formData.append("cholestrol", form['cholestrol'].value);
    formData.append("conviction", form['drivinglicense'].value);
    formData.append("medcondition", form['preMedCond'].value);
    formData.append("KnowCoverage", "yes");

    return this.http.post<any>(this.url + 'quote/update/' + id, formData);
  }

  insuranceNeeded(form: any) {
    let id = localStorage.getItem('basicInfoId');
    let formData: any = new FormData;
    formData.append("LifeInsuranceNeeded", form);
    return this.http.post<any>(this.url + 'quote/update/' + id, formData);
  }

  disclaimer(Disclaimer: string) {
    let id = localStorage.getItem('basicInfoId');
    let formData: any = new FormData;
    formData.append("Disclaimer", Disclaimer);
    return this.http.post<any>(this.url + 'quote/update/' + id, formData);
  }
}
