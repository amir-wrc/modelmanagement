import {Component} from "@angular/core";
import {IonicPage,NavController, PopoverController} from "ionic-angular";
import {Storage} from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // search condition
  keywords:any="";
  city:any="";
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }

  mem:any = "6";

  constructor(private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Rio de Janeiro, Brazil"
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  // go to result page
  doSearch() {
    let filterBy:any={};
    if(this.keywords!=''){
      filterBy.fname = [this.keywords.toLowerCase()];
    }
    if(this.city!=''){
      filterBy.city = [this.city.toLowerCase()];
    }
    if(this.mem!=''){
      //filterBy.industry = [this.mem];
    }
    filterBy = JSON.stringify(filterBy);
    this.nav.push('TripsPage',{filterBy:filterBy});
  }

  // choose place
  choosePlace(from) {
    this.nav.push('SearchLocationPage', from);
  }

  // to go account page
  goToAccount() {
    this.nav.push('SettingsPage');
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create('NotificationsPage');
    popover.present({
      ev: myEvent
    });
  }

}

//
