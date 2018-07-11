import {Component} from "@angular/core";
import {NavController,IonicPage} from "ionic-angular";
import {Storage} from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public nav: NavController,public storage:Storage) {
  }

  // logout
  logout() {
    this.storage.remove('id');
    this.nav.setRoot('LoginPage');
  }
}
