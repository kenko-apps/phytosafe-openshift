import {Component} from '@angular/core';
import {ViewController, NavParams} from 'ionic-angular';

import { Diacritics } from '../../providers/diacritics';

@Component({
  selector: 'autocomplete',
  templateUrl: 'autocomplete.html'
})

export class Autocomplete {
  autocompleteItems;
  autocompleteEntry;
  
  //service = new google.maps.places.AutocompleteService();

  constructor (public viewCtrl: ViewController, public params: NavParams, public diacritics: Diacritics) {
    this.autocompleteItems = [];
    this.autocompleteEntry = {
      query: ''
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.autocompleteEntry.query = item;
    this.viewCtrl.dismiss(item);
  }
  
  search() {
    this.viewCtrl.dismiss(this.autocompleteEntry.query);
  }

  updateSearch() {
    if (this.autocompleteEntry.query == '') {
      this.autocompleteItems = [];
    } else {
      this.autocompleteItems = this.params.get('dataAutocomplete').filter((val)=>{
        let strVal = this.diacritics.replaceDiacritics(val.toLowerCase());
        let strEntry = this.diacritics.replaceDiacritics(this.autocompleteEntry.query.toLowerCase());
        return strVal.indexOf(strEntry) > -1;
      });
    }
  }
}