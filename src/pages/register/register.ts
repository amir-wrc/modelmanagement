import { Storage } from '@ionic/storage';
import {Component} from "@angular/core";
import {IonicPage,NavController,Events,ToastController } from "ionic-angular";
import {Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import {LoginPage} from '../login/login';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseurlProvider } from '../../providers/baseurl/baseurl';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  private todo : FormGroup;
  
  constructor(public nav: NavController,private formBuilder: FormBuilder,public storage:Storage,public events:Events, public http: Http,public service: BaseurlProvider,public toastCtrl: ToastController ) {
    this.todo = this.formBuilder.group({
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      email: ['',Validators.compose([Validators.required,Validators.email])],
      password: ['',Validators.required]
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

isFieldValid(field: string) {
  return !this.todo.get(field).valid && this.todo.get(field).touched;
}

displayFieldCss(field: string) {
  return {
    'has-error': this.isFieldValid(field),
    'has-feedback': this.isFieldValid(field)
  };
}

  redirectSignIn(){
    this.nav.setRoot('LoginPage');
  }
  // register and go to home page
  register() {
    if (this.todo.valid) {
    let new_register:any=[];
    
    let email = this.todo.value.email;
    let pass = this.todo.value.password;
    let fname = this.todo.value.first_name;
    let lname = this.todo.value.last_name;
    
    let data = "first_name="+fname+"&last_name="+lname+"&email="+email+"&password="+pass;
    let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers.append('Authorization', this.token);
    this.http.post(this.service.base_url + 'signup',data, {headers: headers})
      .subscribe(res => {
        if(res.json().code == '200'){
          localStorage.setItem("token", res.json().token);
          this.nav.setRoot('HomePage');
        }else{
          let toast = this.toastCtrl.create({
            message: res.json().message,
            duration: 3000,
            position: 'top'
            });

            toast.onDidDismiss(() => {
            console.log('Dismissed toast');
            });

            toast.present();
        }
        
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    }else {
      this.validateAllFormFields(this.todo); //{7}
    }
    
    
  }

  // go to login page
  login() {
    this.nav.setRoot('LoginPage');
  }
}
