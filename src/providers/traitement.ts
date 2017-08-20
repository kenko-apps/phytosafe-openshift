import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Api } from './api';
import { LocalStockage } from './localstockage';

/**
 * @class Traitement - Ce service utilise les requêtes définies dans le fichier providers/api pour faire l'interface entre le client et le serveur (et la table Formulaire).
 * Les réponses du serveur aux requêtes envoyées sont des objets JSON, et doivent commencer par le champ `status` : 
 * ```json
 * {
 *   status: 'success',
 *   traitres: {
 *     // ce champ doit contenir a minima l'id du formulaire, stocké sous le nom idForm.
 *   }
 * }
 * ```
 * Si le champ `status` n'est pas un `success`, une erreur est envoyée.
 */

@Injectable()
export class Traitement {

  public subCreate: any;

  constructor(public http: Http, public api: Api, public localstockage: LocalStockage) { }

  /**
   * Méthode qui envoie une requête GET pour récupérer la liste des traitements enregistrés dans la base côté serveur. 
   * @method getTrait
   * @requires providers/localstockage - la fonction utilise la méthode setData.
   * @requires providers/api - la fonction utilise la méthode get.
   * @param {} - aucun paramètre n'est passé à la méthode.
   * @returns {Observable} - un observable est renvoyé pour suivre l'état de la requête. 
   */
  getTrait() {

    //Il faut s'assurer qu'il n'y a déjà pas une requête en cours lorsqu'on envoie une requête de récupération de la liste des données.
    if(this.subCreate) {
       this.subCreate.unsubscribe();
    }

    let seq = this.api.get('traitement').share();
    
    this.subCreate = seq.map(res => res.json())
      .subscribe();

    return seq;
  }

}
