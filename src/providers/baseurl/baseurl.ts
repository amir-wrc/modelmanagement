import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BaseurlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BaseurlProvider {
base_url:any="http://mms.wrctpl.com/api/users/";
  constructor(public http: HttpClient) {
    console.log('Hello BaseurlProvider Provider');

  }

}
