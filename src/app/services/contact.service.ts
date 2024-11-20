import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class contactService {
    url = 'http://estatenest.capital/restapi/add/';
    constructor(private http: HttpClient) {

    }

    contactUs(form: any) {
        let formData: any = new FormData;
        formData.append("firstname", form['fName'].value);
        formData.append("lastname", form['lName'].value);
        formData.append("email", form['email'].value);
        formData.append("phone", form['phone'].value);
        formData.append("contact_date", form['bookingDate'].value);
        formData.append("contact_time", form['bookingTime'].value);
        formData.append("message", form['message'].value);
        return this.http.post<any>(this.url + 'contact', formData);
    }

    dropLine(form: any) {
        let help = "";
        form['help'].value.forEach((e: any) => {
            help = help + "," + e.item_text;
        });
        let formData: any = new FormData;
        formData.append("name", form['name'].value);
        formData.append("email", form['email'].value);
        formData.append("phone", form['phone'].value);
        formData.append("message", form['message'].value);
        formData.append("help", help);
        formData.append("subject", form['subject'].value);
        formData.append("AdviceType", form['AdviceType'].value);
        return this.http.post<any>(this.url + 'dropusaline', formData);
    }

}