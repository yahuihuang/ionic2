import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { QRCodePage } from './qrcode';

@NgModule({
  declarations: [
    QRCodePage,
  ],
  imports: [
    IonicPageModule.forChild(QRCodePage),
    TranslateModule.forChild()
  ],
  exports: [
    QRCodePage
  ]
})
export class QRCodePageModule { }
