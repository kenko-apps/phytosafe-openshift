import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import { LocalStockage } from './localstockage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Ce service permet de créer un formulaire, de le rempir et de le modifier. Il utilise les requêtes définies dans le fichier api.ts
 * Les réponses du serveur aux requêtes envoyées sont des objets JSON, et doivent commencer par le champ `status` : 
 * ```json
 * {
 *   status: 'success',
 *   formres: {
 *     // ce champ doit contenir l'id du formulaire.
 *   }
 * }
 * ```
 * Si le champ `status` n'est pas un `success`, une erreur est envoyée.
 */

@Injectable()
export class Formulaire {

  public subCreate: any;

  constructor(public http: Http, public api: Api, public localstockage: LocalStockage) { }

  /**
   * Envoie une requête POST pour créer un nouveau formulaire côté serveur. Ce formulaire est créé avec deux champs possédant une valeur au minimum : la date de création du formulaire, calculée côté client, et l'identifiant unique du formulaire, créé côté serveur. Le serveur renvoie cet identifiant unique qui est stocké localement côté client.
   * dataForm sont les champs à remplir côté serveur.
   */
  createForm(dataForm) {

    if(this.subCreate) {
       this.subCreate.unsubscribe();//On ne peut créer qu'un seul formulaire côté serveur. Il faut s'assurer qu'il n'y a pas une requête http en cours lorsqu'on envoie une requête de création du formulaire.
    }
    
    let seq = this.api.post('formulaire', dataForm).share();

    this.subCreate = seq.map(res => res.json())
      .subscribe(res => {
        // Si la requête est un succès, l'identifiant du formulaire est stocké localement
        if (res.status == 'success') {
          this.localstockage.setData(JSON.parse(res.formres)); // Le stockage de l'identifiant du formulaire doit avoir le nom idForm.
          this.localstockage.removeData(dataForm);//-- il faut ensuite supprimer toutes les données sauf l'id
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  updateForm(idForm, dataForm) {
    
    if(this.subCreate) {
       this.subCreate.unsubscribe();//On ne peut créer qu'un seul formulaire côté serveur. Il faut s'assurer qu'il n'y a pas une requête http en cours lorsqu'on envoie une requête de création du formulaire.
    }
    
    let seq = this.api.patch('formulaire/' + idForm.toString(), dataForm).share();

    this.subCreate = seq.map(res => res.json())
      .subscribe(res => {
        if (res.status == 'success') {
          this.localstockage.removeData(dataForm); // il faut ensuite supprimer toutes les données sauf l'id
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }
}
