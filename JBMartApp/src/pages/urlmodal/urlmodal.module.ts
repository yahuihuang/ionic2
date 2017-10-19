import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UrlModalPage } from './urlmodal';

@NgModule({
  declarations: [
    UrlModalPage
  ],
  imports: [
    IonicPageModule.forChild(UrlModalPage),
  ],
  entryComponents: [
    UrlModalPage
  ]
})
export class UrlModalPageModule {}
