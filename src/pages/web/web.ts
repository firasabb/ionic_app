import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the WebPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-web',
  templateUrl: 'web.html',
})
export class WebPage {

  url: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer, private iab: InAppBrowser) {

    this.url = sanitizer.bypassSecurityTrustUrl(this.navParams.get('url'));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WebPage');
    this.openInBrowser();
  }


  openInBrowser(){
    this.iab.create(this.url);
  }


}
