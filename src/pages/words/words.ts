import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApiProvider } from '../../providers/api/api';
import { WordPage } from '../word/word';
import { SetupPage } from '../setup/setup';
import { NativeStorage } from '@ionic-native/native-storage';
import { AppRate } from '@ionic-native/app-rate';
import { AdMob } from '@ionic-native/admob-plus';

/**
 * Generated class for the WordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-words',
  templateUrl: 'words.html',
})
export class WordsPage {

  language: any;
  words: any;
  page = 1;
  facebookButton: any;

  title: any;
  message: any;
  cancelButtonLabel: any;
  laterButtonLabel: any;
  rateButtonLabel: any;

  apiUrl = 'http://142.93.79.211/api';

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private admob: AdMob, private appRate: AppRate, private storage: NativeStorage, private api: ApiProvider, private http: Http, private loadingCtrl: LoadingController) {
    
    this.platform.ready().then(()=>{

      if(platform.isRTL){

        this.title = 'ما تقييمك للتطبيق؟';
        this.message = 'هل يعجبك التطبيق؟ يمكنك تقييمه الآن!';
        this.cancelButtonLabel = 'لا أريد';
        this.laterButtonLabel = 'ليس الآن';
        this.rateButtonLabel = 'نعم';
        this.facebookButton = 'تابعنا';

      }else{

        this.title = 'Could you rate CashSource?';
        this.message = 'If you enjoy using CashSource, would you mind taking a moment to rate it? Thanks so much!';
        this.cancelButtonLabel = 'No';
        this.laterButtonLabel = 'Remind Me Later';
        this.rateButtonLabel = 'Rate It Now';
        this.facebookButton = 'Like us';
      }
    },()=>{});

  }

  ionViewWillLoad(){
    this.language = this.navParams.get('language');
  }

  ionViewDidLoad() {
    this.showRate();
    this.showBanner();
    this.presentLoading();
  }


  showBanner() { 

      this.admob.banner.show({
        id: {
          // replace with your ad unit IDs
          //android: 'ca-app-pub-5166868654451969/1716425711',
          android: 'ca-app-pub-5166868654451969/1716425711',
          ios: 'ca-app-pub-xxx/yyy'
        },
      });

  }


  presentLoading() {
    const loader = this.loadingCtrl.create();
    loader.present();
    this.http.get(this.apiUrl  + '/' + this.language + '/' + 'words' + '?page=' + 1).map(res => res.json()).subscribe(res => {
      let words = res.data;
      let arrayWords = [];
      for(let word of words){
        arrayWords.push(word);
      }
      this.words = arrayWords;
      this.api.setWordsLanguage(this.words);
      loader.dismiss();      
    }, err => {
      this.storage.getItem('words').then(data => {
        if(this.language == data.words[0].language){
          this.words = data.words;
        }
      }, () => {

      });
      loader.dismiss();
      console.log(err); 
    });
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;

    setTimeout(() => {

      this.http.get(this.apiUrl  + '/' + this.language + '/' + 'words' + '?page=' + this.page).map(res => res.json()).subscribe(res => {
        let words = res.data;
        let arrayWords = [];
        for(let word of words){
          this.words.push(word);
        }
        this.api.setWordsLanguage(this.words);   
      }, err => {
        
      });

      infiniteScroll.complete();
    }, 1000);
  }

  selectWord(word){
    this.navCtrl.push(WordPage, {
      word: word
    });
  }


  goToSetup(){
    this.storage.remove('language');
    this.navCtrl.setRoot(SetupPage);
  }


  showRate(){
    this.appRate.preferences = {
      displayAppName: 'CashSource',
      usesUntilPrompt: 2,
      promptAgainForEachNewVersion: false,
      simpleMode: true,
      storeAppURL: {
        ios: '1216856883',
        android: 'market://details?id=com.devdactic.crossingnumbers'
      },
      customLocale: {
        title: this.title,
        message: this.message,
        cancelButtonLabel: this.cancelButtonLabel,
        laterButtonLabel: this.laterButtonLabel,
        rateButtonLabel: this.rateButtonLabel
      }
    };
    this.appRate.promptForRating(false);
  }


  goToFacebook(){
    window.open('https://www.facebook.com/pg/HyperApps-1995419170537190', '_system');
  }

}
