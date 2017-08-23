import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { Formulaire } from '../../../providers/formulaire';
import { LocalStockage } from '../../../providers/localstockage';

@Component({
  selector: 'resultats',
  templateUrl: 'resultats.html'
})
export class Resultats {

  constructor(public navCtrl: NavController, public translate: TranslateService, public formulaire: Formulaire, public localstockage: LocalStockage) {
    /*traitement.getTrait().toPromise().then((res) => {
      this.traitementNom = [res.blob];//A VERIFIER - BLOB PERMET DE RETROUVER LE BODY DE LA REPONSE!!
    }).catch((err)=>{
      console.error('ERROR', err);
    }); */
  }

}