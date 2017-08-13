import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'accueil',
  templateUrl: 'accueil.html'
})
export class Accueil {

  constructor(public navCtrl: NavController) { }

  nextPage() {
    //Mise en place du timer

    //Création d'un nouveau formulaire : le serveur doit fournir un numéro unique afin d'identifier le formulaire
    
    //Stockage local de l'identifiant unique du formulaire
    
    //Navigation à la première page du formulaire - Données personnelles
    //this.navCtrl.push();
  }
}
