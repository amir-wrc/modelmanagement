import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, Events } from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';



export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';
  alldata: any = {};
  appMenuItems: Array<MenuItem>;
  storage_det: any = [];
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public storage: Storage,
    public events: Events
  ) {
    // this.import_data();
    this.events.subscribe('user_data',(userdata)=>{
      this.alldata =  JSON.parse(userdata).user;
      console.log(this.alldata);
      
    })
    this.initializeApp();

    this.appMenuItems = [
      { title: 'Home', component: 'HomePage', icon: 'home' },
      //{title: 'Local Weather', component: LocalWeatherPage, icon: 'partly-sunny'}
    ];
    let id: any = this.storage.get('id');

    let token: any = localStorage.getItem('token');
    //alert(token);
    if (token != undefined && token!=''){
      this.rootPage = 'HomePage';
    } else {
      this.rootPage = 'LoginPage';
    }


  }

  initializeApp() {
    let yahooOnly: any = {};

    this.platform.ready().then(() => {

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);
      
        

    });
  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  edit() {
    this.nav.push('EditProfilePage');
  }
  logout() {
    this.storage.remove('id');
    localStorage.setItem('token','');
    //this.storage.clear();
    //this.events.unsubscribe('id');
    this.nav.setRoot('LoginPage');
  }

}
