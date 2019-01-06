import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ThrowStmt } from '@angular/compiler';
import 'rxjs/add/operator/Map';
import { Config } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  apiUrl = 'http://localhost/laravel/guide/public/api';
  word: any;
  wordsLanguageLevel: any;
  wordsLanguage: any;
  languages: any;
  adShowed = 0;

  constructor(public http: Http, private storage: NativeStorage) {
    //this.getWordApi();
  }

  setAdShowed(num){
    this.adShowed = num;
  }

  getAdShowed(){
    return this.adShowed;
  }
  
  setWord(word){
    this.word = word;
  }

  getWord(){
    return this.word;
  }


  setLanguages(languages){
    this.languages = languages;
  }

  getLanguages(){
    return this.languages;
  }


  setWordsLanguage(wordsLanguage){
    this.wordsLanguage = wordsLanguage;
    this.storage.setItem('words', {words: wordsLanguage});
  }

  getWordsLanguage(){
    return this.wordsLanguage;
  }


  getWordApi(){

    this.http.get(this.apiUrl + 'word/tester').subscribe(data => {
      this.setWord(data);
      console.log(data);
    }, err => {

    });
  }



  getWordsLanguageApi(language){

    this.http.get(this.apiUrl + language + '/words').subscribe(data => {
      this.setWordsLanguage(data);
      console.log(data);
    }, err => {

    });
  }


  getWordsApi(language){

    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
     let options = new RequestOptions({ headers: headers,withCredentials: true});
    

      this.http.get(this.apiUrl + language + '/' + '/words').map(res => res.json()).subscribe(res => {
        let arrayWords = res.data;
        this.setWordsLanguage(arrayWords);
      }, err => {
  
      });
      
  }


  getLanguagesApi(){
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

     let options = new RequestOptions({ headers: headers,withCredentials: true});
    

      this.http.get(this.apiUrl  + '/languages').map(res => res.json()).subscribe(res => {
        let languages = res.data;
        let arrayLanguages = [];
        for(let language of languages){
          arrayLanguages.push(language.language);
        }
        this.setLanguages(arrayLanguages);
      }, err => {
  
      });
  }

  

}
