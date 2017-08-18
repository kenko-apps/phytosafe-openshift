import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

//import { Maladie } from '../maladie/maladie';
import{ Autocomplete } from '../../autocomplete/autocomplete';

import { Formulaire } from '../../../providers/formulaire';
import { LocalStockage } from '../../../providers/localstockage';

@Component({
  selector: 'maladie',
  templateUrl: 'maladie.html'
})
export class Maladie {

  maladieForm: FormGroup;
  submitAttempt: boolean = false;
  organe=[
    "coeur",
    "sein",
    "côlon",
    "rectum",
    "pancréas",
    "prostate",
    "cerveau",
    "moelle osseuse",
    "sang",
    "vaisseaux sanguins",
    "testicules",
    "poumons"
  ];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, translate: TranslateService, public formBuilder: FormBuilder, public formulaire: Formulaire, public localstockage: LocalStockage) {
    this.maladieForm = formBuilder.group({
        organe_primitif: ['', Validators.compose([ Validators.pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)'), Validators.required])],
        date_diagnostic: ['', Validators.required],
        maladie_check:  ['', Validators.required],
        nom_traitement: ['',Validators.compose([ Validators.pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]*)'), Validators.required])],
        radio_check:  ['', Validators.required],
        onco_ref: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ. ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)')])],
    });
  }

  showOrganeModal(){
    let modal = this.modalCtrl.create(Autocomplete, {dataAutocomplete: this.organe});
    modal.onDidDismiss(data => {
      console.log(data);
      this.maladieForm.patchValue({organe_primitif: data});
    });
    modal.present();
  }

  /**
   * Fonction qui est liée au bouton "Continuer" sur la deuxième page du formulaire - Maladie.
   * Elle valide les valeurs entrées dans les champs du formulaire et les stocke localement. 
   * Une fois ces valeurs stockées, elle récupère la valeur stockée correspondant à l'identificant du formulaire. 
   * Si aucun identifiant n'a été stocké, elle créé un nouveau formulaire avec toutes les données stockées. Sinon, elle met à jour le formulaire avec ces mêmes données.
   * Elle affiche ensuite la troisième page du formulaire - Traitements Alternatifs.
   * @method nextPage
   * @requires providers/formulaire - la fonction utilise les méthodes setData, getData, getAllData.
   * @requires providers/localstockage - la fonction utilise les méthodes createForm et updateForm.
   * @param {} - aucun paramètre n'est passé à la fonction.
   * @returns {} - aucune valeur n'est retournée par la fonction.
   */
  nextPage() {
    this.submitAttempt = true;
    if(this.maladieForm.valid){

      //Stockage local des données remplies dans cette page de formulaire
      this.localstockage.setData(this.maladieForm.value).then((message) => {
        console.log('Données Personnelles : ' + message)

        //Mise à jour/création du formulaire sur le serveur avec les données entrées sur cette page du formulaire
        this.localstockage.getData("idForm").then((val)=> {
          this.localstockage.getAllData().then((dataForm)=>{
            //il faut créer/mettre à jour le formulaire avec toutes les données stockées
            if (val==null){
              //Si le formulaire n'a pas été créé, il faut le créer
              this.formulaire.createForm(dataForm);            
            } else {
              //Sinon, il faut le mettre à jour
              this.formulaire.updateForm(val,dataForm);
            }
          });
        });

        //Navigation à la troisième page du formulaire - Traitements Alternatifs
        //this.navCtrl.push(Maladie);

      });
    }
  }
}