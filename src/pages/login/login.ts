import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController,Events } from "ionic-angular";
import {HomePage} from "../home/home";
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {RegisterPage} from "../register/register";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private todo : FormGroup;
  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController,private formBuilder: FormBuilder,public storage:Storage,public events:Events ) {
    this.menu.swipeEnable(false);
    this.todo = this.formBuilder.group({
      email: [''],
      pass: ['']
    });
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    //console.log(this.todo.value)
    let email = this.todo.value.email;
    let pass = this.todo.value.pass;
    let yahooOnly:any = [];
    //let jsondata:any = JSON.stringify([{email:'suman@wrctpl.com',pass:'123456'},{email:'amir@wrctpl.com',pass:'12345678'}]);
    //let jsondata:any = this.storage.get('trip');
    //console.log(jsondata);

    this.storage.get('trip').then((jsondata) => {
      console.log(jsondata);
      yahooOnly = JSON.parse(jsondata).filter(function (entry) {
        return entry.email === email && entry.pass === pass;
      });
      console.log(yahooOnly.length);
      
      if(email == "" || pass == "" || yahooOnly.length == '0'){
        let toast = this.toastCtrl.create({
          message: "Please enter correct email/password",
          duration: 3000,
          position: 'top'
        });
  
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
  
        toast.present();
      } else{
        this.storage.set('id',yahooOnly[0]['id']);
        this.events.publish('trip',jsondata,yahooOnly[0]['id']);
        this.nav.setRoot(HomePage);
      }
      
    });
    
    
    //this.nav.setRoot(HomePage);
    
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
