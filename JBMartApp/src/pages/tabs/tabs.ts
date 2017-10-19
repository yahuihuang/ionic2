import { Component/*, ViewChild*/ } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, MenuController, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
//import { BrowserTab } from '@ionic-native/browser-tab';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';
import { Tab4Root } from '../pages';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  //@ViewChild('myTabs') tabRef: Tabs;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";
  
  constructor(public navCtrl: NavController, public translateService: TranslateService, public menuCtrl: MenuController,
        public inAppBrowser: InAppBrowser, public platform : Platform) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE', 'TAB4_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
      this.tab4Title = values['TAB4_TITLE'];
    });
  }
    
  openMenu(menuId : any) {
    console.log('in openMenu');
    if (menuId == 2) {
        this.menuCtrl.enable(false, 'menu1');
        this.menuCtrl.enable(true, 'menu2');
    } else {
        this.menuCtrl.enable(true, 'menu1');
        this.menuCtrl.enable(false, 'menu2');
    }
    
    this.menuCtrl.open();
  }  
  
  //https://www.pluralsight.com/guides/front-end-javascript/using-cordova-inappbrowser-plugin-with-ionic-2+-to-open-urls
  //https://www.thepolyglotdeveloper.com/2016/01/launch-websites-with-ionic-2-using-the-inappbrowser/
  openInAppBrowser(){
    //this.platform.ready().then(() => {
    //  this.inAppBrowser('https://google.com', '_blank', "location=yes");    
    //})
    
    //this.browser = this.inAppBrowser.create('https://google.com', '_blank', this.browserOptions);
    //this.handleBrowserSubscriptions();
    //this.screenOrientation.unlock();
    
    //this.inAppBrowser.create('https://google.com','_system',{location:'no'}); 
    this.platform.ready().then(() => {
        this.inAppBrowser.create('https://www.tssco.com.tw/', "_self", "location=true");
    });
    
    //this.navCtrl.push('https://google.com');
    //document.location.href='https://www.tssco.com.tw/?&output=embed';
  }
  
  openUrl(){
    this.platform.ready().then(() => {
        this.inAppBrowser.create('https://www.tssco.com.tw/', "_self", "location=true");
    });
  /*
    this.browserTab.isAvailable()
      .then((isAvailable: boolean) => {
        if (isAvailable) {
            if (this.platform.is('cordova')) {
              //this.browserTab.openUrl('www.tssco.com.tw/');
            }
        } else {
            // if custom tabs are not available you may  use InAppBrowser
        }
      });        
      */
  }
  
  openCart() {
    this.navCtrl.push('CartPage');
    //this.tabRef.select(0);
  }
  
}
