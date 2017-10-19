import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html'
})
export class QRCodePage {

  currentItems: any = [];
  private testString: string;
  
  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, 
    public alertCtrl: AlertController,
    public translateService: TranslateService) {    
    this.translateService.get('WELCOME_TITLE').subscribe((value) => {
      this.testString = value;
    })
  }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
  
  doAlert() {
    let alert = this.alertCtrl.create({
      title: this.testString + '!',
      message: this.testString + '啊!',
      buttons: ['Ok']
    });
    alert.present()
  }
  
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: '測試Prompt',
      message: "增加",
      inputs: [
        {
          name: '標題',
          placeholder: '請輸入標題'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('取消 clicked');
          }
        },
        {
          text: '儲存',
          handler: data => {
            console.log('儲存 clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '同意否?',
      message: '請問您是否同意?',
      buttons: [
        {
          text: '不同意',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '同意',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

 showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('那個班機您要撘乘?');

    alert.addInput({
      type: 'checkbox',
      label: 'Alderaan',
      value: 'value1',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Bespin',
      value: 'value2'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
      }
    });
    alert.present();
  }
  
  //Gestures
  public press: number = 0;
  public pan: number = 0;
  public swipe: number = 0;
  public tap: number = 0;
  
  pressEvent(e) {
    this.press++
  }
  panEvent(e) {
    this.pan++
  }
  swipeEvent(e) {
    this.swipe++
  }
  tapEvent(e) {
    this.tap++
  }
}
