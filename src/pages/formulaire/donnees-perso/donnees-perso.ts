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

  idleState: any;
  donneesPersoForm: FormGroup;
  submitAttempt: boolean = false;
  
  constructor(public navCtrl: NavController,public alertCtrl: AlertController, translate: TranslateService, public formBuilder: FormBuilder, public inactif: Inactif, public formulaire: Formulaire, public localstockage: LocalStockage) {
    this.donneesPersoForm = formBuilder.group({
        prenomForm: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)'), Validators.required])],
        nomForm: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)'), Validators.required])],
        date_naissanceForm: ['', Validators.required]
    });
    inactif.idleSet();
    this.idleState = inactif.idleStart().subscribe(()=>this.redirectConfirm());
  }

  redirectConfirm() {
    this.idleState.unsubscribe();
    let alert = this.alertCtrl.create({
      title: 'Attention',
      subTitle: '',
      message: 'Toutes les informations préalablement saisies seront perdues.',
      buttons: [
        {
          text: 'OK',
          handler: () =>{ 
            //La redirection vers la page d'accueil est précédé d'une suppression des données stockées localement.
            this.localstockage.clearAllData().then(()=>{
              alert.dismiss().then(() => {
                this.navCtrl.popToRoot();
              });
            });
            return false;//La fermeture de l'alerte est faite manuellement, une fois la suppression des données effectuées. 
          }
        },
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () =>{
            this.inactif.idleSet();
            this.idleState = this.inactif.idleStart().subscribe(()=>this.redirectConfirm());
            timer.unsubscribe();
          }
        }
      ]
    });
    alert.present();
    let timer = this.inactif.idleTimer().subscribe((t)=>{
      let idleCount = this.inactif.idleCount-t;
      if (idleCount>=0){
        alert.setSubTitle('Vous allez être redirigé vers la page d\'accueil du formulaire dans ' + idleCount + ' secondes.');
      } else {
        this.localstockage.clearAllData().then(()=>{
          alert.dismiss().then(() => {
            this.navCtrl.popToRoot();
          });
        });
      }
    });
  }

  nextPage() {
    this.submitAttempt = true;
    if(this.donneesPersoForm.valid){

      //Stockage local des données remplies dans cette page de formulaire
      this.localstockage.setData(this.donneesPersoForm.value).then((message) => {
        console.log('Données Personnelles : ' + message)

        //Mise à jour du formulaire sur le serveur avec les données entrées sur cette page du formulaire.
        this.localstockage.getData("idForm").then((val)=> {
          if (val==null){
            //il faut créer le formulaire avec toutes les données stockées
            this.localstockage.getAllData().then((dataForm)=>{
              this.formulaire.createForm(dataForm);
            });            
          } else {
            //il faut mettre à jour le formulaire avec toutes les données stockées
            this.localstockage.getAllData().then((dataForm)=>{
              this.formulaire.updateForm(val,dataForm);
            });
          }
        });

        //Navigation à la première page du formulaire - Données personnelles
        this.navCtrl.push(Maladie);

      });
    }
  }
}
