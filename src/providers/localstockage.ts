import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * Ce service permet de stocker localement des objets. Il décompose le contenu de l'objet et stocke chacune de ses composantes. Il permet aussi de supprimer une variable du stockage local ou de la lire.
 */

@Injectable()
export class LocalStockage {

  constructor(public storage: Storage) { }

  /**
   * Stocke localement chacune des propriétés d'un objet.
   */
  setData(data) {
    for(var propertyName in data) {
      this.storage.set(propertyName,data[propertyName]).then(() => {
        console.log('donnée enregistrée');});
      console.log(propertyName + ' enregistré : ' + data[propertyName]);
    }
  }

  /**
   * Récupère des données qui étaient stockées localement.
   */
  getData(data){
      return this.storage.get(data);
  }

  /**
   * Supprime localement chacune des propriétés d'un objet.
   */
  removeData(data){
    for(var propertyName in data) {
      if (propertyName!="idForm"){
        this.storage.remove(propertyName).then(() => {
          console.log('donnée supprimée');});
        console.log(propertyName + ' supprimée');
      }
    }
  }

  /**
   * Récupère toutes les données stockées localement.
   */
  getAllData(){
    var data: object;
    this.storage.forEach( (value, key, index) => {
	    data[key]=value;
    })
    return data;
  }
}