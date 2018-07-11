import {Component} from "@angular/core";
import {IonicPage,NavController,NavParams} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {Storage} from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html'
})
export class TripDetailPage {
  // trip info
  public trip: any={};
  // number of adult
  public adults = 2;
  // number of children
  public children = 0;

  constructor(public nav: NavController, public tripService: TripService,public navParams: NavParams,public storage:Storage) {
    let id= navParams.get('id');
    // set sample data
    let yahooOnly:any =[];
    this.storage.get('trip').then((trips) => {
      let pq=this;
      yahooOnly = JSON.parse(trips).filter(function (entry) {
        return entry.id === id;
      });
      console.log(yahooOnly);
      pq.trip = yahooOnly[0];
      
    });
    
  }

  // minus adult when click minus button
  minusAdult() {
    this.adults--;
  }

  // plus adult when click plus button
  plusAdult() {
    this.adults++;
  }

  // minus children when click minus button
  minusChildren() {
    this.children--;
  }

  // plus children when click plus button
  plusChildren() {
    this.children++;
  }

  // go to checkout page
  checkout() {
    this.nav.push('CheckoutTripPage');
  }
}
