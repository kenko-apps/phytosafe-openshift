import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Component} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { Resultats } from '../resultats/resultats';
import{ Autocomplete } from '../../autocomplete/autocomplete';

import { Formulaire } from '../../../providers/formulaire';
import { LocalStockage } from '../../../providers/localstockage';
import { Traitement } from '../../../providers/traitement';

@Component({
  selector: 'traitement-nom',
  templateUrl: 'traitement-nom.html'
})
export class TraitementNom {

  traitementNomForm: FormGroup;
  submitAttempt: boolean = false;
  checkTraitement: boolean = false;
  nbTraitement: number = 0;
  traitementTable = [];

  traitementNom = [];
  traitementTitre: string;
  traitementPlaceholder: string;
  
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public translate: TranslateService, public formBuilder: FormBuilder, public formulaire: Formulaire, public localstockage: LocalStockage, public traitement: Traitement) {
    this.createTraitObjet();
    this.traitementNomForm = formBuilder.group({});
    this.traitementNomForm.addControl(this.traitementTable[0].phytonom, this.traitementTable[0].phytonomControl);
    this.traitementNomForm.addControl(this.traitementTable[0].phytodate, this.traitementTable[0].phytodateControl);
    /* traitement.getTrait().toPromise().then((res) => {
      this.traitementNom = [res.blob];//A VERIFIER - BLOB PERMET DE RETROUVER LE BODY DE LA REPONSE!!
    }).catch((err)=>{
      console.error('ERROR', err);
    }); */
  }

  /**
   * Fonction qui créé une paire nom du traitement/date de début du traitement et la stocke dans un tableau.
   * @method createTraitObjet
   * @param {} - aucun paramètre n'est passé à la fonction.
   * @returns {} - aucune valeur n'est retournée par la fonction.
   */
  createTraitObjet(){
    this.nbTraitement = this.nbTraitement+1;
    interface traitementObjet {
      phytonom : string,
      phytodate: any,
      phytonomControl : FormControl,
      phytodateControl : FormControl
    };
    var phytoForm: traitementObjet = {
      phytonom: "phytonom_"+this.nbTraitement.toString()+"_Form",
      phytodate: "phytodate_"+this.nbTraitement.toString()+"_Form",
      phytonomControl : new FormControl ('',  Validators.compose([ Validators.pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]*)'), Validators.required])),
      phytodateControl : new FormControl ('')
    }
    this.traitementTable.push(phytoForm);
  }

  /**
   * Fonction qui permet d'ajouter un traitement.
   * @method addPhyto
   * @param {} - aucun paramètre n'est passé à la fonction.
   * @returns {} - aucune valeur n'est retournée par la fonction.
   */
  addPhyto() {
    if (this.traitementNomForm.valid){
      let i: number = this.traitementTable.length;
      this.createTraitObjet();
      // add phyto treatment to the list
      this.traitementNomForm.addControl(this.traitementTable[i].phytonom, this.traitementTable[i].phytonomControl);
      this.traitementNomForm.addControl(this.traitementTable[i].phytodate, this.traitementTable[i].phytodateControl);
      this.checkTraitement = false;
      this.submitAttempt = false;
    }else{
      this.checkTraitement = true;
    }
  }

  /**
   * Fonction qui permet de supprimer un traitement.
   * @method removePhyto
   * @requires providers/localstockage - la fonction utilise la méthode removeData.
   * @param {number} - le numéro du traitement à supprimer est passé à la fonction.
   * @returns {} - aucune valeur n'est retournée par la fonction.
   */
  removePhyto(i: number) {
    // remove phyto treatment from the list
    var suppressionObjet = {}
    suppressionObjet[this.traitementTable[i].phytonom] = this.traitementNomForm.value[this.traitementTable[i].phytonom];
    suppressionObjet[this.traitementTable[i].phytodate] = this.traitementNomForm.value[this.traitementTable[i].phytodate];
    console.log(suppressionObjet);
    this.localstockage.removeData(suppressionObjet);
    this.traitementNomForm.removeControl(this.traitementTable[i].phytonom);
    this.traitementNomForm.removeControl(this.traitementTable[i].phytodate);
    this.traitementTable.splice(i,1);
  }

  /**
   * Fonction qui est liée au champ "Nom du traitement" sur la page du formulaire - Nom des Thérapies.
   * Elle permet d'ouvrir une page modale (pages/autocomplete) qui propose, en fonction des entrées de l'utilisateur une liste de noms possibles : autocompletion.
   * @method showOrganeModal
   * @requires pages/autocomplete - elle appelle la page autocomplete.ts.
   * @param {} - aucun paramètre n'est passé à la fonction.
   * @returns {} - aucune valeur n'est retournée par la fonction.
   */
  showTraitementModal(i: number){
    //console.log(this.traitementNom);
    if (this.traitementNom.length > 0){
      this.translate.get('TITRE_MODAL_TRAITEMENT_BIS').subscribe(value => {
        this.traitementTitre = value;
      });
      this.translate.get('PLACEHOLDER_MODAL_TRAITEMENT').subscribe(value => {
        this.traitementPlaceholder = value;
      });
      let modal = this.modalCtrl.create(Autocomplete, {dataAutocomplete: this.traitementNom, titreAutocomplete: this.traitementTitre, placeholderAutocomplete: this.traitementPlaceholder, enterAutocomplete: false});
      modal.onDidDismiss(data => {
        //console.log(data);
        let dataObj =  {};
        dataObj[this.traitementTable[i].phytonom] = data;
        this.traitementNomForm.patchValue(dataObj);
      });
      modal.present();
    };
  }

  /**
   * Fonction qui est liée au bouton "Continuer" sur la quatrième page du formulaire - Nom des Thérapies.
   * Elle valide les valeurs entrées dans les champs du formulaire et les stocke localement. 
   * Une fois ces valeurs stockées, elle récupère la valeur stockée correspondant à l'identificant du formulaire. 
   * Si aucun identifiant n'a été stocké, elle créé un nouveau formulaire avec toutes les données stockées. Sinon, elle met à jour le formulaire avec ces mêmes données.
   * Elle affiche ensuite la page des résultats du formulaire - Résultats.
   * @method nextPage
   * @requires providers/localstockage - la fonction utilise les méthodes setData, getData, getAllData.
   * @requires providers/formulaire - la fonction utilise les méthodes createForm et updateForm.
   * @param {} - aucun paramètre n'est passé à la fonction.
   * @returns {} - aucune valeur n'est retournée par la fonction.
   */
  nextPage() {
    this.submitAttempt = true;
    if(this.traitementNomForm.valid){

      //Stockage local des données remplies dans cette page de formulaire
      this.localstockage.setData(this.traitementNomForm.value).then((message) => {
        console.log('********************************************************');
        console.log('Nom des Thérapies : ' + message);
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

        //Navigation à la page des résultats du formulaire - Résultats
        this.navCtrl.push(Resultats);

      });
    }
  }
}