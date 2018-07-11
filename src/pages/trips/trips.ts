import {Component} from "@angular/core";
import {IonicPage,NavController,NavParams} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {Storage} from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html'
})
export class TripsPage {
  // list of trips
  public trips: any=[];
  tot:any=0;
  
  constructor(public nav: NavController, public tripService: TripService,public navParams: NavParams,public storage:Storage) {
    // set sample data
    let data:any=[];
    let filterBy = JSON.parse(this.navParams.get('filterBy'));
    this.storage.get('trip').then((trips) => {
      //console.log(user_id);
    let result = JSON.parse(trips).filter(o => Object.keys(filterBy).every(k => filterBy[k].some(f => o[k] === f)));
    //console.log(result);
    this.storage.get('id').then((user_id) => {
    data = result.filter(function(entry) {
      return entry.id != user_id;
    });
    console.log(data);
    
    this.trips = data;
    this.tot = this.trips.length;
  });
    //console.log(this.trips.length);
    });
    
  }

  // view trip detail
  viewDetail(id) {
    this.nav.push('TripDetailPage', {id: id});
  }
}
