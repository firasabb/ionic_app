import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { WordsPage } from '../words/words';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../home/home';



/**
 * Generated class for the SetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {

  languages: any;
  test: any;

  testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
  apiUrl = 'http://142.93.79.211/api';

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private nativeStorage: NativeStorage, private api: ApiProvider, private http: Http, private loadingCtrl: LoadingController) {
    this.languages = this.api.getLanguages();
  }


  ionViewWillLoad(){
    this.nativeStorage.getItem('language').then((data) => {
      let language = data.language;
      this.navCtrl.setRoot(WordsPage, {
        language: language
      });
      if(language == 'arabic' || language == 'Arabic'){
        this.platform.setDir('rtl', true);
      } else{
        this.platform.setDir('ltr', true);
      }
    },(err) => {

    });
  }


  ionViewDidLoad() {
    this.presentLoading();
    this.testIt();
  }


  presentLoading() {
    const loader = this.loadingCtrl.create();
    //loader.present();

    this.http.get(this.apiUrl  + '/languages').map(res => res.json()).subscribe(res => {
      let languages = res.data;
      let arrayLanguages = [];
      for(let language of languages){
        arrayLanguages.push(language);
      }
      this.api.setLanguages(arrayLanguages);
      //loader.dismiss();
      this.languages = arrayLanguages;
    }, err => {

    });
  }


  selectLanguage(language){

    this.nativeStorage.setItem('language', {language: language});

    if(language == 'arabic' || language == 'Arabic'){
      this.platform.setDir('rtl', true);
    } else{
      this.platform.setDir('ltr', true);
    }

    this.navCtrl.setRoot(WordsPage, {
      language: language
    });
  }


  testIt(){

    this.http.get(this.testUrl).map(res => res.json()).subscribe(res => {
      this.test = res.title;
    }, err => {

    });

  }

}
