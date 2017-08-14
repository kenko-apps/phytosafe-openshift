import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

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
   * Envoie une requête POST pour créer un nouveau formulaire côté serveur. Le formulaire créé n'a qu'un seul champ : l'id, identifiant unique qui permet d'identifier le formulaire. Cet id est généré côté serveur. Si le serveur renvoie une erreur, un id sera créé côté client.
   */
  createForm(dateCrea) {
    //Stockage local de la date de création du formulaire
    this.storage.set("dateForm",dateCrea.dateID);
    let seq = this.api.post('formulaire', dateCrea).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // Si la requête est un succès, l'identifiant du formulaire est stocké localement
        if (res.status == 'success') {
            this.storage.set("idForm", res.formres.id);
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }
}
