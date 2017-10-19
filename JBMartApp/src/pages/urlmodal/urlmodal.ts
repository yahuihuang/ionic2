import { Component } from '@angular/core';
import { IonicPage/*, NavController*/, NavParams, ViewController } from 'ionic-angular';
import { DomSanitizer  } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-url-modal',
  templateUrl: 'urlmodal.html',
})
export class UrlModalPage {
  Url = '';
  Sid = '';
  
  constructor(/*public navCtrl: NavController,*/ public navParams: NavParams, public viewCtrl: ViewController,
    public sanitizer : DomSanitizer) {
    this.Url = navParams.get('Url');
    this.Sid = navParams.get('Sid');
    console.log('navParams: ' + this.Url + ' , ' + this.Sid);
  }

  getURL() {
    let url = this.Url + '?Sid=' + this.Sid;
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  dismiss() {  
    let data = { 'ok': true };
    this.viewCtrl.dismiss(data);
    
    //this.viewCtrl.dismiss();
  }

}
