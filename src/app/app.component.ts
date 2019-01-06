import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SetupPage } from '../pages/setup/setup';
import { HomePage } from '../pages/home/home';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SetupPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, oneSignal: OneSignal) {
    platform.ready().then(() => {

        oneSignal.startInit('b988f6e7-3d80-4c23-acb1-992ddb2bf70e', '740052705483');

        oneSignal.inFocusDisplaying(oneSignal.OSInFocusDisplayOption.InAppAlert);

        oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
        });

        oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });

        oneSignal.endInit();
        
        statusBar.overlaysWebView(true);
        statusBar.backgroundColorByHexString('#42b9f0');
        splashScreen.hide();
      
      });
  
  }
}

