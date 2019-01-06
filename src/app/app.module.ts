import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SetupPage } from '../pages/setup/setup';
import { WordsPage } from '../pages/words/words';
import { WordPage } from '../pages/word/word';
import { WebPage } from '../pages/web/web';
import { ApiProvider } from '../providers/api/api';
import { NativeStorage } from '@ionic-native/native-storage';
import { AppRate } from '@ionic-native/app-rate';
import { AdMob } from '@ionic-native/admob-plus';
import { OneSignal } from '@ionic-native/onesignal';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WordsPage,
    WordPage,
    SetupPage,
    WebPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WordsPage,
    WordPage,
    SetupPage,
    WebPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    NativeStorage,
    InAppBrowser,
    AppRate,
    AdMob,
    OneSignal,
    GoogleAnalytics
  ]
})
export class AppModule {}
