import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {Storage} from '@ionic/storage';

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
    this.nav.setRoot(LoginPage);
  }
}
