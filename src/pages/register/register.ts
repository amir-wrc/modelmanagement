import { Storage } from '@ionic/storage';
import {Component} from "@angular/core";
import {NavController,Events } from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  private todo : FormGroup;
  constructor(public nav: NavController,private formBuilder: FormBuilder,public storage:Storage,public events:Events ) {
    this.todo = this.formBuilder.group({
      fname:[''],
      lname:[''],
      email: [''],
      pass: ['']
    });
  }

  // register and go to home page
  register() {
    let new_register:any=[];
    let jdata:any = {
          "fname": "",
          "lname":"",
          "email":"",
          "pass":"",
          "sub_name": "Videos",
          "thumb": "",
          "description": "",
          "location": "",
          "industry":"0",
          "city":"",
          "videos":"",
          "images": [],
          "trust":[],
          "info": [],
          "discipline": []
        }
    let email = this.todo.value.email;
    let pass = this.todo.value.pass;
    let fname = this.todo.value.fname;
    let lname = this.todo.value.lname;
    if(fname!=''){
      jdata.fname = fname;
    }
    if(lname!=''){
      jdata.lname = lname;
    }
    if(email!=''){
      jdata.email = email;
    }
    if(pass!=''){
      jdata.pass = pass;
    }
    this.storage.get('trip').then((jsondata) => {
      
      jdata.id = parseInt(JSON.parse(jsondata).length)+1;
     // console.log(jdata.id);
      
      //this.events.publish('id', jdata.id);
      this.storage.set('id',jdata.id);

      new_register = JSON.parse(jsondata); 
      new_register.push(jdata);
      //console.log(new_register);
      this.storage.set('trip',JSON.stringify(new_register));
      this.events.publish('trip', JSON.stringify(new_register),jdata.id);
      this.nav.setRoot(HomePage);
    });
    
    
    
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
