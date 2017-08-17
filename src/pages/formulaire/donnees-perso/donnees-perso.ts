import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { Maladie } from '../maladie/maladie';

import { Inactif } from '../../../providers/inactif';
import { Formulaire } from '../../../providers/formulaire';
import { LocalStockage } from '../../../providers/localstockage';

@Component({
  selector: 'donnees-perso',
  templateUrl: 'donnees-perso.html'
})
export class DonneesPerso {

  donneesPersoForm: FormGroup;
  submitAttempt: boolean = false;
  
  constructor(public navCtrl: NavController,public alertCtrl: AlertController, translate: TranslateService, public formBuilder: FormBuilder, public inactif: Inactif, public formulaire: Formulaire, public localstockage: LocalStockage) {
    //Construction du formulaire qui sera rempli sur cette page
    this.donneesPersoForm = formBuilder.group({
        prenomForm: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)'), Validators.required])],
        nomForm: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)'), Validators.required])],
        date_naissanceForm: ['', Validators.required]
    });
    //Si l'utilisateur est inactif, une alerte est envoyée avec la possibilité de continuer ou de recommencer le questionnaire.
    inactif.idleSet(navCtrl,alertCtrl);
  }

  /**
   * Fonction qui est liée au bouton "Continuer" sur la première page du formulaire - Données personnelles.
   * Elle valide les valeurs entrées dans les champs du formulaire et les stocke localement. 
   * Une fois ces valeurs stockées, elle récupère la valeur stockée correspondant à l'identificant du formulaire. 
   * Si aucun identifiant n'a été stocké, elle créé un nouveau formulaire avec toutes les données stockées. Sinon, elle met à jour le formulaire avec ces mêmes données.
   * Elle affiche ensuite la deuxième page du formulaire - Maladie.
   * @method nextPage
   * @requires providers/formulaire - la fonction utilise les méthodes setData, getData, getAllData.
   * @requires providers/localstockage - la fonction utilise les méthodes createForm et updateForm.
   * @param {} - aucun paramètre n'est passé à la fonction.
   * @returns {} - aucune valeur n'est retournée par la fonction.
   */
  nextPage() {
    this.submitAttempt = true;
    if(this.donneesPersoForm.valid){

      //Stockage local des données remplies dans cette page de formulaire
      this.localstockage.setData(this.donneesPersoForm.value).then((message) => {
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

        //Navigation à la première page du formulaire - Données personnelles
        this.navCtrl.push(Maladie);

      });
    }
  }
}
