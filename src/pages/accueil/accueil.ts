import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DonneesPerso } from '../formulaire/donnees-perso/donnees-perso';

import { Formulaire } from '../../providers/formulaire';
import { LocalStockage } from '../../providers/localstockage';

@Component({
  selector: 'accueil',
  templateUrl: 'accueil.html'
})
export class Accueil {

  constructor(public navCtrl: NavController, public formulaire: Formulaire, public localstockage: LocalStockage) {}

  nextPage() {
    //Date de création du nouveau formulaire
    interface dateObjet { dateForm: number };
    var currentTime = new Date();
    var dateCreaForm: dateObjet = {dateForm : currentTime.getFullYear()*100000000+(currentTime.getMonth()+1)*1000000+currentTime.getDate()*10000+currentTime.getHours()*100+currentTime.getMinutes()};

    //Stockage local de la date de création du nouveau formulaire
    this.localstockage.setData(dateCreaForm);
    
    //Création d'un nouveau formulaire. La première donnée à entrer dans le formulaire est la date de création.
    this.formulaire.createForm(dateCreaForm);
    
    //Navigation à la première page du formulaire - Données personnelles
    this.navCtrl.push(DonneesPerso);
  }
}
