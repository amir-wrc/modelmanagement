import {Component} from "@angular/core";
import {IonicPage,ViewController} from "ionic-angular";
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})

export class NotificationsPage {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
