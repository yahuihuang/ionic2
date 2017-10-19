import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlModalPage } from '../urlmodal/urlmodal';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  loginForm: FormGroup;
  
  countyItems: any;
  districtItems: any;
  countyText = '';
  districtText = '';
  
  account: { country: string, serviceterm: bool } = {    
    country: 'TW',
    serviceterm: false
  };
    
  currentDate = (new Date()).toISOString();
  
  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public http: HttpClient,
    public modalCtrl: ModalController,
    private formBuilder: FormBuilder) {
    
    //1.form
    this.loginForm = formBuilder.group({
      acct: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(50), Validators.required])],
      email: ['', Validators.compose([Validators.required, 
                        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20), Validators.required])],  
      gender: ['', Validators.compose([Validators.required])],
      birthday: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      county: ['', Validators.compose([Validators.required])],
      district: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      contact_telext: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(4), Validators.required])],
      contact_tel: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(8), Validators.required])],
      mobile_telext: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(4), Validators.required])],
      mobile_tel: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(8),Validators.required])],
      serviceterm: ['', Validators.compose([Validators.requiredTrue])]
    });
    
    //2.translate
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    });
    
    this.translateService.get('COUNTY').subscribe((value) => {
        this.countyText = value;
    });        
    
    this.translateService.get('DISTRICT').subscribe((value) => {
        this.districtText = value;
     });    
     
    this.getCountys();
  }
  
  ionViewLoaded() {
    //setTimeout(() => {
    //  this.loginForm.controls.acct.setFocus();
    //},150);
  }
 
  getCountys() {
    this.http.get("./assets/i18n/country/zh.json")
         //.map(res => res.json())
         .subscribe(res => {
             //this.data = res.json();
             
             console.log(res);
             this.countyItems = res; //JSON.stringify(res);
         }, error => {
             console.log(error);
         });   
      
  }
  
  /*
  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }*/
  
  doSignup(value) {
    console.log('in login serviceterm: ' + value.serviceterm);
    console.log(this.account);

    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {    
      // this.navCtrl.push(MainPage);
      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
  
  county_onSelectChange(selectedValue: any) {
    console.log('Selected', selectedValue);
    this.getDistricts(selectedValue);
  }
  
  getDistricts(districtId) {
    this.districtItems = null;
    this.http.get("./assets/i18n/district/zh.json")
         .subscribe(res => {
             console.log(res);
             Object.keys(res).forEach(key=> {
                //console.log(key);     
                //console.log(res[key]);     
                if (key == districtId) {
                  this.districtItems = res[key];
                }
             });
             //this.districtItems = res;
         }, error => {
             console.log(error);
         });  
  }
  
  showServiceTerm() {
    console.log('showServiceTerm');
    let serviceTermModal = this.modalCtrl.create(UrlModalPage, { Url: 'http://www.jb-mart.com/Home/Service', Sid: 'BS941' });
    serviceTermModal.onDidDismiss(data => {
        console.log(data);
    });
    
    serviceTermModal.present();
  }
}
