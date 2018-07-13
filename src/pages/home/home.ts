import { Component } from "@angular/core";
import { IonicPage, NavController, PopoverController,Events } from "ionic-angular";
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseurlProvider } from '../../providers/baseurl/baseurl';
//import {Storage} from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // search condition
  keywords: any = "";
  city: any = "";
  token: any = localStorage.getItem('token');
  constructor(public nav: NavController, public http: Http, public popoverCtrl: PopoverController, public service: BaseurlProvider,public events:Events) {
    this.profiles();
  }

  profiles() {
    let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', this.token);
    this.http.get(this.service.base_url + 'profile', {headers: headers})
      .subscribe(res => {
        if(res.json().code == '200'){
          this.events.publish('user_data',JSON.stringify(res.json()));
        }
        
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers.append('Accept', 'application/json');
    // headers.append('Authorization', this.token);
    // // headers.append('Content-Type', 'application/json');
    // let options = new RequestOptions({ headers: headers });
    // let data = "";
    // //alert(this.service.base_url);
    // this.http.post(this.service.base_url + 'profile', data, options).map(response => {
    //   alert();
    //   let data = response.json();
    //   console.log(data);

    // });
  }

  ionViewWillEnter() {



  }

}