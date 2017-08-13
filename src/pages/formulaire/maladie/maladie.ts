import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'maladie',
  templateUrl: 'maladie.html'
})
export class Maladie {

  slideDeuxForm: FormGroup;
  submitAttempt: boolean = false;
  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public formBuilder: FormBuilder) {
    this.slideDeuxForm = formBuilder.group({
        organe_primitif: ['', Validators.compose([ Validators.pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)'), Validators.required])],
        date_diagnostic: ['', Validators.required],
        maladie_check:  ['', Validators.required],
        chimio_check:  ['', Validators.required],
        therapie_check:  ['', Validators.required],
        nom_traitement: ['',Validators.compose([ Validators.pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]*)'), Validators.required])]
    }); 
  }

  nextPage() {
    this.submitAttempt = true;
    if(this.slideDeuxForm.valid){
      //this.navCtrl.push(FormulairePageTrois);
      console.log("success!")
      console.log(this.slideDeuxForm.value);
    }
  }
}