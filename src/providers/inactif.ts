import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import { TranslateService } from '@ngx-translate/core';

import { LocalStockage } from './localstockage';

/**
 * Un service qui permet de vérifier si l'utilisateur est actif ou non.
 */
@Injectable()
export class Inactif {

  idleCount: number = 15; //Fixe le temps avant que l'utilisateur, une fois inactif, soit redirigé vers la page d'accueil.
  idleState: any;

  constructor(public translate: TranslateService, private idle: Idle, public localstockage: LocalStockage) {
    // Temps à partir duquel on estime que l'utilisateur est inactif.
    idle.setIdle(5);
    // Actions qui terminent l'inactivité.
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
  }

  idleSet(navCtrl,alertCtrl) {
    this.idle.watch();
    this.idleState = this.idle.onIdleStart.subscribe(()=>this.idleRedirectConfirm(navCtrl,alertCtrl));
  }

  idleTimer(){  
    return Observable.timer(0,1000);
  }


  idleRedirectConfirm(navCtrl,alertCtrl) {
    this.idleState.unsubscribe();
    this.idle.stop();

    let buttonTextConfirm: string;
    let buttonTextCancel: string;
    this.translate.get('BOUTON_CONFIRM_ALERTE').subscribe(value => {
      buttonTextConfirm = value;
    });
    this.translate.get('BOUTON_ANNUL_ALERTE').subscribe(value => {
      buttonTextCancel = value;
    });

    let alert = alertCtrl.create({
      title: '',
      subTitle: '',
      message: '',
      buttons: [
        {
          text: buttonTextConfirm,
          handler: () =>{ 
            //La redirection vers la page d'accueil est précédé d'une suppression des données stockées localement.
            this.localstockage.clearAllData().then(()=>{
              timer.unsubscribe();
              alert.dismiss().then(() => {
                navCtrl.popToRoot();
              });
            });
            return false;//La fermeture de l'alerte est faite manuellement, une fois la suppression des données effectuées. 
          }
        },
        {
          text: buttonTextCancel,
          role: 'cancel',
          handler: () =>{
            this.idleSet(navCtrl,alertCtrl);
            timer.unsubscribe();
          }
        }
      ]
    });
    let titre: string;
    let message: string;
    this.translate.get('TITRE_ALERTE').subscribe(value => {
      titre = value;
    });
    this.translate.get('MESSAGE_ALERTE').subscribe(value => {
      message = value;
    });
    alert.setTitle(titre);
    alert.setMessage(message);
    let timer = this.idleTimer().subscribe((t)=>{
      let count = this.idleCount-t;
      if (count>=0){
        let sousTitrePrinc: string;
        let sousTitreUnit: string;
        this.translate.get('SOUSTITRE_ALERTE').subscribe(value => {
          sousTitrePrinc = value;
        });
        this.translate.get('SOUSTITRE_UNIT_ALERTE').subscribe(value => {
          sousTitreUnit = value;
        });
        alert.setSubTitle(sousTitrePrinc + count + sousTitreUnit);
      } else {
        this.localstockage.clearAllData().then(()=>{
          timer.unsubscribe();
          alert.dismiss().then(() => {
            navCtrl.popToRoot();
          });
        });
      }
    });
    
    alert.present();
  }
}
