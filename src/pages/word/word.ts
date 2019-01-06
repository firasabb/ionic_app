import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ApiProvider } from '../../providers/api/api';
import { AdMob } from '@ionic-native/admob-plus';


/**
 * Generated class for the WordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-word',
  templateUrl: 'word.html',
})
export class WordPage {

  word: any;
  stars: any;
  isRTL: any;
  adShowed: any;

  description: any;
  eligibility: any;
  payment: any;
  checkit: any;
  link: any;

  constructor(public navCtrl: NavController, public sanitizer: DomSanitizer, private api: ApiProvider, private admob: AdMob, public navParams: NavParams, public iab: InAppBrowser, private storage: NativeStorage, private platform: Platform) {

    if(platform.isRTL){
      this.description = "كيفية عمله:";
      this.eligibility = "المتطلبات:";
      this.payment = "طرق الدفع:";
      this.checkit = "سجل الآن";
    } else {

      this.description = "How does it work?";
      this.eligibility = "Eligibilty and requirements:";
      this.payment = "Payment methods:";
      this.checkit = "Sign Up";
    }

    this.word = this.navParams.get('word');
    let rating = this.word.rating_us;
    switch(rating){
      case 1:
        this.stars = [1];
        break;

      case 2:
        this.stars = [1, 2];
        break;

      case 3:
        this.stars = [1, 2, 3];
        break;

      case 4:
        this.stars = [1, 2, 3, 4];
        break;

      case 5:
        this.stars = [1, 2, 3, 4, 5];
        break;

      default:
        break;
    }

    this.link = this.word.androidlink;
    this.adShowed = this.api.getAdShowed();
  }

  launchInterstitial() {

    document.addEventListener('deviceready', () => {
      this.admob.interstitial.load({
        id: {
          // replace with your ad unit IDs
          android: 'ca-app-pub-5166868654451969/7569081291',
          ios: 'ca-app-pub-xxx/zzz',
        },
      }).then(() => this.admob.interstitial.show())
    }, false);

  }


  checkVisit(){

    this.storage.getItem('visit').then(
    (data) => {
      if(data.num == 1){
        this.storage.setItem('visit', {num: 2});
      }else if(data.num == 2){
        this.storage.remove('visit');
      }
    },

    (error) => { 

      this.launchInterstitial();
      this.storage.setItem('visit', {num: 2});
     }

  );

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WordPage');
    this.checkVisit();
  }


  goToWeb(){
    /*this.navCtrl.push(WebPage, {
      url: this.word.android_link
    });*/
   // window.open(this.link, '_system');
   this.iab.create(this.link);
  }

}
