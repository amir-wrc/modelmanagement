import { Component, ViewChild } from "@angular/core";
import { Platform, Nav,Events  } from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Storage} from '@ionic/storage';

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

  rootPage:any = '';
  alldata:any={};
  appMenuItems: Array<MenuItem>;
  storage_det:any = [];
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public storage:Storage,
    private http: Http,
    public events: Events
  ) {
   // this.import_data();
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: 'HomePage', icon: 'home'},
      //{title: 'Local Weather', component: LocalWeatherPage, icon: 'partly-sunny'}
    ];
    let id:any =  this.storage.get('id');
    //console.log(email);
/*     this.storage.get('id').then((val) => {
      console.log(val);
      if(val!=null)
      this.rootPage = 'HomePage';
    }); */


    if(id!=undefined){
      this.rootPage = 'HomePage';
    }else{
      this.rootPage = 'LoginPage';
    }

    
  }

  initializeApp() {
    let yahooOnly:any={};
    
    this.platform.ready().then(() => {
      
      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);
      this.storage.get('trip').then((output) => {
         //console.log(JSON.parse(output));
         this.storage.get('id').then((val) => {
         this.events.publish('trip', output,val);
         });
      });

      this.storage_det = this.storage.get('trip');
      if(this.storage_det.length == '0'){
        this.import_data();
      }
     
      
    
        this.events.subscribe('trip', (output,id) => {
       
        console.log(JSON.parse(output));
        console.log(id);
        
        yahooOnly = JSON.parse(output).filter(function (entry) {
          //console.log(id);
          console.log(entry.id);
          return entry.id === id
        });
        
        
        this.alldata = yahooOnly[0];
       //});
      });
      
  //     this.http.get('assets/data/subtitles.json').map(res => res.json()).subscribe(data => {
  //       console.log(data);
        
  //  });

    });
  }

  import_data(){
    let trip:any = [
        {
          "id": "1",
          "fname": "Veronika",
          "lname":"Baskakova",
          "email":"veronika@gmail.com",
          "pass":"123456",
          "price_adult": 60,
          "price_child": 30,
          "time": "12h",
          "free_cancellation": 1,
          "electric_voucher": 1,
          "sub_name": "Videos",
          "thumb": "assets/img/trip/thumb/trip_5.jpg",
          "description": "From sexy Ipanema and Copacabana, to more secluded and slightly lesser-known stretches of sand, like Prainha Beach, Brazil's Rio de Janeiro is best known for its beaches. Grab your sunscreen and Brazilian bikinis and head to the sunny shores of Rio's best beaches.",
          "location": "München, Stuttgart",
          "industry":"6",
          "city":"mumbai",
          "videos":"https://mmooddeell.com/wp-content/uploads/2018/02/IMG_1078.mp4",
          "images": [
            "assets/img/trip/thumb/trip_11.jpg",
            "assets/img/trip/thumb/trip_6.jpg",
            "assets/img/trip/thumb/trip_7.jpg"
          ],
          "trust":[
            "Social verification",
            "Mobile verification",
            "Reviews"
          ],
          "info": [
            "ETHNICITY: White",
            "GENDER: FEMALE",
            "HEIGHT: 164cm / 5´5”",
            "EYES: Light Brown",
            "DRESS: 36 EU, 8 UK, 6 US",
            "SHOES: 39 EU, 6 UK, 6 US"
          ],
          "discipline": [
            "LINGERIE: SWIMSUIT/BIKINI",
            "ACTORS: PROMOTIONAL",
            "GLAMOUR: MODEL",
            "CATALOG: CLOTHING",
            "COMMERCIAL: COVER",
            "EVENT: FITNESS",
            "FOOT: ONLINE/WEB",
            "VIDEO: HOSTESS",
            "PETITE: PINUP"
            
          ]
        },
        {
          "id": "2",
          "fname": "Julia",
          "lname": "Jansen",
          "email":"julia@gmail.com",
          "pass":"123456",
          "price_adult": 60,
          "price_child": 30,
          "time": "12h",
          "free_cancellation": 1,
          "electric_voucher": 1,
          "sub_name": "Videos",
          "thumb": "assets/img/trip/thumb/trip_12.jpg",
          "industry":"6",
          "city":"kolkata",
          "description": "From sexy Ipanema and Copacabana, to more secluded and slightly lesser-known stretches of sand, like Prainha Beach, Brazil's Rio de Janeiro is best known for its beaches. Grab your sunscreen and Brazilian bikinis and head to the sunny shores of Rio's best beaches.",
          "location": "München, Stuttgart",
          "videos":"",
          "images": [
            "assets/img/trip/thumb/trip_13.jpg",
            "assets/img/trip/thumb/trip_14.jpg",
            "assets/img/trip/thumb/trip_15.jpg"
          ],
          "trust":[
            "Social verification",
            "Mobile verification"
          ],
          "info": [
            "ETHNICITY: White",
            "GENDER: FEMALE",
            "HEIGHT: 164cm / 5´5”",
            "EYES: Light Brown",
            "DRESS: 36 EU, 8 UK, 6 US",
            "SHOES: 39 EU, 6 UK, 6 US"
          ],
          "discipline": [
            "LINGERIE: SWIMSUIT/BIKINI",
            "ACTORS: PROMOTIONAL",
            "GLAMOUR: MODEL",
            "CATALOG: CLOTHING",
            "COMMERCIAL: COVER",
            "EVENT: FITNESS",
            "FOOT: ONLINE/WEB",
            "VIDEO: HOSTESS",
            "PETITE: PINUP"
            
          ]
        },
        {
          "id": "3",
          "fname": "Nick",
          "lname":"Flatt",
          "email":"nick@gmail.com",
          "pass":"123456",
          "price_adult": 60,
          "price_child": 30,
          "time": "12h",
          "free_cancellation": 1,
          "electric_voucher": 1,
          "sub_name": "Videos",
          "thumb": "assets/img/trip/thumb/trip_16.jpg",
          "description": "From sexy Ipanema and Copacabana, to more secluded and slightly lesser-known stretches of sand, like Prainha Beach, Brazil's Rio de Janeiro is best known for its beaches. Grab your sunscreen and Brazilian bikinis and head to the sunny shores of Rio's best beaches.",
          "location": "München, Stuttgart",
          "industry":"6",
          "city":"kolkata",
          "videos":"",
          "images": [
            "assets/img/trip/thumb/trip_17.jpg",
            "assets/img/trip/thumb/trip_18.jpg",
            "assets/img/trip/thumb/trip_19.jpg"
          ],
          "trust":[
            "Social verification",
            "Mobile verification"
          ],
          "info": [
            "ETHNICITY: White",
            "GENDER: MALE",
            "HEIGHT: 164cm / 5´5”",
            "EYES: Light Brown",
            "DRESS: 36 EU, 8 UK, 6 US",
            "SHOES: 39 EU, 6 UK, 6 US"
          ],
          "discipline": [
            "LINGERIE: SWIMSUIT/BIKINI",
            "ACTORS: PROMOTIONAL",
            "GLAMOUR: MODEL",
            "CATALOG: CLOTHING",
            "COMMERCIAL: COVER",
            "EVENT: FITNESS",
            "FOOT: ONLINE/WEB",
            "VIDEO: HOSTESS",
            "PETITE: PINUP"
            
          ]
        }
      ]
      
      this.storage.set('trip',JSON.stringify(trip));
      this.events.publish('trip', JSON.stringify(trip));
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  edit(){
    this.nav.push('EditProfilePage');
  }
  logout() {
    this.storage.remove('id');
    //this.storage.clear();
    //this.events.unsubscribe('id');
    this.nav.setRoot('LoginPage');
  }

}
