import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { Maladie } from '../maladie/maladie';

import { Inactif } from '../../../providers/inactif';
import { Formulaire } from '../../../providers/formulaire';
import { LocalStockage } from '../../../providers/localstockage';

@Component({
  selector: 'donnees-perso',
  templateUrl: 'donnees-perso.html'
})
export class DonneesPerso {

  DonneesPersoForm: FormGroup;
  submitAttempt: boolean = false;
  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public formBuilder: FormBuilder, public inactif: Inactif, public formulaire: Formulaire, public localstockage: LocalStockage) {
    this.DonneesPersoForm = formBuilder.group({
        prenomForm: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)'), Validators.required])],
        nomForm: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)'), Validators.required])],
        date_naissanceForm: ['', Validators.required]
    });
    inactif.reset(); 
  }

  nextPage() {
    this.submitAttempt = true;
    if(this.DonneesPersoForm.valid){

      //Stockage local des données remplies dans cette page de formulaire
      this.localstockage.setData(this.DonneesPersoForm.value);
      
      //Mise à jour du formulaire sur le serveur avec les données entrées sur cette page du formulaire.
      this.localstockage.getData("idForm").then((val)=> {
        if (val==null){
          //il faut créer le formulaire avec toutes les données stockées
          this.formulaire.createForm(this.localstockage.getAllData());
        } else {
          //il faut mettre à jour le formulaire avec toutes les données stockées
          this.formulaire.updateForm(val,this.localstockage.getAllData());
        }
      });
      console.log(this.localstockage.getAllData());

      //Navigation à la première page du formulaire - Données personnelles
      this.navCtrl.push(Maladie);
    }
  }
}
