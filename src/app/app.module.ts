import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { NgIdleModule } from '@ng-idle/core';

import { MyApp } from './app.component';

import { Accueil } from '../pages/accueil/accueil';
import { DonneesPerso } from '../pages/formulaire/donnees-perso/donnees-perso';
import { Maladie } from '../pages/formulaire/maladie/maladie';

import { Api } from '../providers/api';
import { Inactif } from '../providers/inactif';
import { Formulaire } from '../providers/formulaire';
import { LocalStockage } from '../providers/localstockage';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// The translate loader needs to know where to load i18n files in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    Accueil,
    DonneesPerso,
    Maladie
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    NgIdleModule.forRoot(),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Accueil,
    DonneesPerso,
    Maladie
  ],
  providers: [
    Api,
    Inactif,
    Formulaire,
    LocalStockage,
    SplashScreen,
    StatusBar,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
