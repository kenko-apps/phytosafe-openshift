import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { Maladie } from '../maladie/maladie';

import { Inactif } from '../../../providers/inactif';

@Component({
  selector: 'donnees-perso',
  templateUrl: 'donnees-perso.html'
})
export class DonneesPerso {

  slideUnForm: FormGroup;
  submitAttempt: boolean = false;
  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public formBuilder: FormBuilder, public inactif: Inactif) {
    this.slideUnForm = formBuilder.group({
        prenom: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)'), Validators.required])],
        nom: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)'), Validators.required])],
        date_naissance: ['', Validators.required],
        onco_ref: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ. ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)')])],
    });
    inactif.reset(); 
  }

  nextPage() {
    this.submitAttempt = true;
    if(this.slideUnForm.valid){
      this.navCtrl.push(Maladie);
      console.log("success!")
      console.log(this.slideUnForm.value);
    }
  }
}
