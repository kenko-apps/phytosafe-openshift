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
    return new Promise((resolve,reject) => {
      for(var propertyName in data) {
        console.log(propertyName + ' en cours d\'enregistrement : ' + data[propertyName]);
        this.storage.set(propertyName,data[propertyName]);       
      }
      resolve('enregistré !');
    });
  }

  /**
   * Récupère des données qui étaient stockées localement.
   */
  getData(data){
      return this.storage.get(data);
  }

  /**
   * Supprime localement chacune des propriétés d'un objet, sauf l'identifiant unique.
   */
  removeData(data){
    return new Promise((resolve, reject) => {
      for(var propertyName in data) {
        if (propertyName!="idForm"){
          this.storage.remove(propertyName).then(() => {
            console.log('donnée supprimée');});
          console.log(propertyName + ' supprimée');
        }
      }
      resolve('Supression des données');
    });
  }

  /**
   * Récupère toutes les données stockées localement.
   */
  getAllData(){
    let data = {};
    return new Promise((resolve, reject) => {
      this.storage.forEach( (value, key, index) => {
        if (typeof key === 'string' && key.endsWith('Form')){
          data[key]=value;
          console.log('la valeur est ' + value + ' et la key est ' + key);
        }
      });
      resolve(data);
    }); 
  }

  /**
   * Supprime 
   */
  clearAllData(){
      return this.storage.clear();
  }
}