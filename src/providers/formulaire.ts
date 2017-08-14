import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Ce service permet de créer un formulaire, de le rempir et de le modifier. Il utilise les requêtes définies dans le fichier api.ts
 * Les réponses du serveur aux requêtes envoyées sont des objets JSON, et doivent commencer par le champ `status` : 
 * ```json
 * {
 *   status: 'success',
 *   formres: {
 *     // ce champ peut contenir l'id du formulaire, les champs remplis ou modifiés.
 *   }
 * }
 * ```
 * Si le champ `status` n'est pas un `success`, une erreur est envoyée.
 */

@Injectable()
export class Formulaire {

  constructor(public http: Http, public api: Api, public storage: Storage) { }

  /**
   * Envoie une requête POST pour créer un nouveau formulaire côté serveur. Ce formulaire est créé avec deux champs possédant une valeur : la date de création du formulaire, calculée côté client, et l'identifiant unique du formulaire, créé côté serveur. Le serveur renvoie cet identifiant unique qui est stocké localement côté client. 
   * dateCrea est la date de création du formulaire.
   */
  createForm(dateCrea) {
    //Stockage local de la date de création du formulaire
    this.storage.set("dateForm",dateCrea.dateID).then(() => {
      console.log('date enregistrée');});
    let seq = this.api.post('formulaire', dateCrea).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // Si la requête est un succès, l'identifiant du formulaire est stocké localement
        if (res.status == 'success') {
          this.storage.set("idForm", res.formres.id).then(() => {
            console.log('id enregistré');});
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }
}
