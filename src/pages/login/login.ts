import {Component} from "@angular/core";
import {IonicPage,NavController, AlertController, ToastController, MenuController,Events } from "ionic-angular";
import {Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import {Storage} from '@ionic/storage';
import {RegisterPage} from '../register/register';
import { BaseurlProvider } from '../../providers/baseurl/baseurl';
import { Http, Headers, RequestOptions } from '@angular/http';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private todo : FormGroup;
  RegisterPage = RegisterPage;
  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController,private formBuilder: FormBuilder,public storage:Storage,public events:Events,public service:BaseurlProvider,public http:Http ) {
    this.menu.swipeEnable(false);
    this.todo = this.formBuilder.group({
      email: ['',Validators.compose([Validators.required,Validators.email])],
      pass: ['',Validators.required]
    });
    
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
}

  redirectSignUp() {
    this.nav.setRoot('RegisterPage');
  }

  // redirectForgotPassword() {
  //   this.nav.setRoot(ForgotPasswordPage);
  // }

  // go to register page
  register() {
    this.nav.setRoot('RegisterPage');
  }

  // login and go to home page
  login() {
    if (this.todo.valid) {
    //console.log(this.todo.value)
    let email = this.todo.value.email;
    let pass = this.todo.value.pass;
    let yahooOnly:any = [];

    //let access_token = this.navParams.get('access_token'); 
    //console.log(access_token);
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    //headers.append('Authorization', access_token);
   // headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers.append('Access-Control-Allow-Origin', '*');

    var data = "email=" + email + "&password=" + pass

    let options = new RequestOptions({ headers: headers });

    this.http.post(this.service.base_url+'login' , data, options)
      .map(response => {
        console.log(response.json())
        let data = response.json();
        //console.log(data);
        if(data.code == '200'){
          localStorage.setItem("token", data.token);
          this.events.publish('token', data.token);
          this.nav.setRoot('HomePage');
        }else{
            let toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000,
            position: 'top'
            });

            toast.onDidDismiss(() => {
            console.log('Dismissed toast');
            });

            toast.present();
        }
               

      })
      .subscribe(
      (response) => { },
      (err) => {
        
      }
      ), error => {
        console.log("Oooops!");
      }, () => {
        console.log("To Bad");
      };
    }else {
      this.validateAllFormFields(this.todo); //{7}
    }
    
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
