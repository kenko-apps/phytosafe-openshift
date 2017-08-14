import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DonneesPerso } from '../formulaire/donnees-perso/donnees-perso';

import { Formulaire } from '../../providers/formulaire';

@Component({
  selector: 'accueil',
  templateUrl: 'accueil.html'
})
export class Accueil {

  constructor(public navCtrl: NavController, public formulaire: Formulaire) {}

  nextPage() {
    //Date de création du nouveau formulaire
    interface dateObjet { dateID: number };
    var currentTime = new Date();
    var dateCrea: dateObjet = {dateID : currentTime.getFullYear()*100000000+(currentTime.getMonth()+1)*1000000+currentTime.getDate()*10000+currentTime.getHours()*100+currentTime.getMinutes()};

    //Création d'un nouveau formulaire. La première donnée à entrer dans le formulaire est la date de création.
    this.formulaire.createForm(dateCrea);
    
    //Navigation à la première page du formulaire - Données personnelles
    this.navCtrl.push(DonneesPerso);
  }
}
