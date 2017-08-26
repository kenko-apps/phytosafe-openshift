webpackJsonp([0],{

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Resultats; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_formulaire__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_localstockage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_incompatibilite__ = __webpack_require__(358);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var Resultats = (function () {
    function Resultats(navCtrl, formBuilder, translate, localstockage, incompatibilite, formulaire, network) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.translate = translate;
        this.localstockage = localstockage;
        this.incompatibilite = incompatibilite;
        this.formulaire = formulaire;
        this.network = network;
        this.submitAttempt = false;
        this.incompRes = [];
        this.informationCheck = false;
        this.errorCheck = false;
        this.resultatsForm = formBuilder.group({
            emailForm: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].pattern('(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)')],
        });
        //Initialise les observateurs de la connexion et de la déconnexion
        network.onConnect().subscribe(function () {
            _this.connectivityCheck = true;
        });
        network.onDisconnect().subscribe(function () {
            _this.connectivityCheck = false;
        });
    }
    Resultats.prototype.ngOnInit = function () {
        var _this = this;
        if (this.connectivityCheck == true) {
            //Vérifier si certaines données du formulaire n'ont pas été envoyées
            this.localstockage.getData("idForm").then(function (val) {
                _this.localstockage.getAllData().then(function (dataForm) {
                    if (dataForm != null) {
                        //Si certaines données n'ont pas été envoyées, il faut créer/mettre à jour le formulaire avec toutes les données stockées.
                        if (val == null) {
                            //Si le formulaire n'a pas été créé, il faut le créer
                            _this.formulaire.createForm(dataForm).toPromise().then(function (res) {
                                _this.localstockage.getData("idForm").then(function (val) {
                                    _this.incompatibilite.getIncomp(val).toPromise().then(function (res) {
                                        _this.incompRes = [res.blob]; //A VERIFIER - BLOB PERMET DE RETROUVER LE BODY DE LA REPONSE!!
                                        _this.informationCheck = true;
                                    }).catch(function (err) {
                                        console.error('ERROR', err);
                                        _this.errorCheck = true;
                                    });
                                });
                            });
                        }
                        else {
                            //Sinon, il faut le mettre à jour
                            _this.formulaire.updateForm(val, dataForm).toPromise().then(function (res) {
                                _this.incompatibilite.getIncomp(val).toPromise().then(function (res) {
                                    _this.incompRes = [res.blob]; //A VERIFIER - BLOB PERMET DE RETROUVER LE BODY DE LA REPONSE!!
                                    _this.informationCheck = true;
                                }).catch(function (err) {
                                    console.error('ERROR', err);
                                    _this.errorCheck = true;
                                });
                            });
                        }
                    }
                    else {
                        _this.incompatibilite.getIncomp(val).toPromise().then(function (res) {
                            _this.incompRes = [res.blob]; //A VERIFIER - BLOB PERMET DE RETROUVER LE BODY DE LA REPONSE!!
                            _this.informationCheck = true;
                        }).catch(function (err) {
                            console.error('ERROR', err);
                            _this.errorCheck = true;
                        });
                    }
                });
            });
        }
    };
    Resultats.prototype.envoieEmail = function () {
        var _this = this;
        this.submitAttempt = true;
        if (this.resultatsForm.valid) {
            //Stockage local des données remplies dans cette page de formulaire
            this.localstockage.setData(this.resultatsForm.value).then(function (message) {
                console.log('Email : ' + message);
                //Mise à jour/création du formulaire sur le serveur avec les données entrées sur cette page du formulaire
                _this.localstockage.getData("idForm").then(function (val) {
                    _this.localstockage.getAllData().then(function (dataForm) {
                        //il faut créer/mettre à jour le formulaire avec toutes les données stockées
                        if (val == null) {
                            //Si le formulaire n'a pas été créé, il faut le créer
                            _this.formulaire.createForm(dataForm);
                        }
                        else {
                            //Sinon, il faut le mettre à jour
                            _this.formulaire.updateForm(val, dataForm);
                        }
                    });
                });
            });
        }
    };
    /**
     * Fonction qui est liée au bouton "Terminé" sur la page de résultats du formulaire - Resultats.
     * Si toutes les données ont été envoyées sur le serveur, elle détruit l'idForm stocké localement.
     * Sinon, elle valide l'adresse email lorsque celle-ci a été saisie et la stocke localement.
     * Elle réorganise le stockage des données qui n'ont pas été envoyées sur le serveur.
     * Elle affiche ensuite la page d'accueil du formulaire - Accueil.
     * @method nextPage
     * @requires providers/localstockage - la fonction utilise les méthodes setData, getData, getAllData.
     * @requires providers/formulaire - la fonction utilise les méthodes createForm et updateForm.
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    Resultats.prototype.nextPage = function () {
        var _this = this;
        this.localstockage.getAllData().then(function (dataForm) {
            if (dataForm != null) {
                //stocker les variables sous une autre forme puis aller à la page d'accueil
            }
            //Navigation à la page d'accueil du formulaire - Accueil
            _this.navCtrl.popToRoot();
        });
    };
    return Resultats;
}());
Resultats = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'resultats',template:/*ion-inline-start:"/home/s/Work/Medecine/phytosafe/src/pages/formulaire/resultats/resultats.html"*/'<ion-header no-shadow>\n  <ion-navbar>\n    <ion-title>\n      <h2 class="slide-title">{{ \'FORM_RESULTAT\' | translate }}</h2>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-bounce>\n  <p>{{ \'FORM_RESULTAT_INTITULE\' | translate }}</p>\n</ion-content>\n'/*ion-inline-end:"/home/s/Work/Medecine/phytosafe/src/pages/formulaire/resultats/resultats.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_6__providers_localstockage__["a" /* LocalStockage */], __WEBPACK_IMPORTED_MODULE_7__providers_incompatibilite__["a" /* Incompatibilite */], __WEBPACK_IMPORTED_MODULE_5__providers_formulaire__["a" /* Formulaire */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */]])
], Resultats);

//# sourceMappingURL=resultats.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Autocomplete; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_diacritics__ = __webpack_require__(270);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Autocomplete = (function () {
    function Autocomplete(viewCtrl, params, diacritics) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.diacritics = diacritics;
        this.autocompleteItems = [];
        this.autocompleteEntry = {
            query: ''
        };
    }
    /**
     * Fonction qui supprime la page modale ouverte, sans passer de données à la page initiale.
     * @method dismiss
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    Autocomplete.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    /**
     * Fonction qui supprime la page modale ouverte, en passant comme valeur à la page initiale la valeur sélectionnée dans la liste proposée (autocompletion).
     * @method chooseItem
     * @param {any} - la valeur sélectionnée dans la liste proposée est passée à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    Autocomplete.prototype.chooseItem = function (item) {
        this.autocompleteEntry.query = item;
        this.viewCtrl.dismiss(item);
    };
    /**
     * Fonction qui supprime la page modale ouverte, en passant comme valeur à la page initiale la valeur entrée par l'utilisateur.
     * @method search
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    Autocomplete.prototype.enterItem = function (keyCode) {
        if (this.params.get('enterAutocomplete') == true && keyCode == 13) {
            this.viewCtrl.dismiss(this.autocompleteEntry.query);
        }
    };
    /**
     * Fonction qui, à chaque saisie de l'utilisateur, compare le contenu saisi et la liste proposée pour limiter la liste aux valeurs qui correspondent à la saisie : autocompletion.
     * @method updateSearch
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {string} - une liste mise à jour suite à la nouvelle saisie de l'utilisateur est retournée par la fonction.
     */
    Autocomplete.prototype.updateSearch = function () {
        var _this = this;
        if (this.autocompleteEntry.query == '') {
            this.autocompleteItems = [];
        }
        else {
            this.autocompleteItems = this.params.get('dataAutocomplete').filter(function (val) {
                var strVal = _this.diacritics.replaceDiacritics(val.toLowerCase());
                var strEntry = _this.diacritics.replaceDiacritics(_this.autocompleteEntry.query.toLowerCase());
                return strVal.indexOf(strEntry) > -1;
            });
        }
    };
    return Autocomplete;
}());
Autocomplete = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'autocomplete',template:/*ion-inline-start:"/home/s/Work/Medecine/phytosafe/src/pages/autocomplete/autocomplete.html"*/'<ion-header>\n    <ion-toolbar>\n      <ion-title>{{this.params.get(\'titreAutocomplete\')}}</ion-title>\n      <ion-searchbar placeholder="{{this.params.get(\'placeholderAutocomplete\')}}" [(ngModel)]="autocompleteEntry.query" [showCancelButton]="true" (ionInput)="updateSearch()" (ionCancel)="dismiss()" (keypress)="enterItem($event.keyCode)"></ion-searchbar>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content>\n    <ion-list>\n      <ion-item *ngFor="let item of autocompleteItems" (click)="chooseItem(item)">\n        {{ item }}\n      </ion-item>\n    </ion-list>\n  </ion-content>'/*ion-inline-end:"/home/s/Work/Medecine/phytosafe/src/pages/autocomplete/autocomplete.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_diacritics__["a" /* Diacritics */]])
], Autocomplete);

//# sourceMappingURL=autocomplete.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Traitement; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__localstockage__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * @class Traitement - Ce service utilise les requêtes définies dans le fichier providers/api pour faire l'interface entre le client et le serveur (et la table Traitement).
 * Les réponses du serveur aux requêtes envoyées sont des objets JSON, et doivent commencer par le champ `status` :
 * ```json
 * {
 *   status: 'success',
 *   traitres: {
 *     // ce champ doit contenir a minima l'id du formulaire, stocké sous le nom idForm.
 *   }
 * }
 * ```
 * Si le champ `status` n'est pas un `success`, une erreur est envoyée.
 */
var Traitement = (function () {
    function Traitement(http, api, localstockage) {
        this.http = http;
        this.api = api;
        this.localstockage = localstockage;
    }
    /**
     * Méthode qui envoie une requête GET pour récupérer la liste des traitements enregistrés dans la base côté serveur.
     * @method getTrait
     * @requires providers/localstockage - la fonction utilise la méthode setData.
     * @requires providers/api - la fonction utilise la méthode get.
     * @param {} - aucun paramètre n'est passé à la méthode.
     * @returns {Observable} - un observable est renvoyé pour suivre l'état de la requête.
     */
    Traitement.prototype.getTrait = function () {
        //Il faut s'assurer qu'il n'y a déjà pas une requête en cours lorsqu'on envoie une requête de récupération de la liste des données.
        if (this.subCreate) {
            this.subCreate.unsubscribe();
        }
        var seq = this.api.get('traitement').share();
        this.subCreate = seq.map(function (res) { return res.json(); })
            .subscribe();
        return seq;
    };
    return Traitement;
}());
Traitement = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__api__["a" /* Api */], __WEBPACK_IMPORTED_MODULE_5__localstockage__["a" /* LocalStockage */]])
], Traitement);

//# sourceMappingURL=traitement.js.map

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 159;

/***/ }),

/***/ 202:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 202;

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStockage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(131);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * @class LocalStockage - Ce service permet d'utiliser le stockage local de l'appareil.
 */
var LocalStockage = (function () {
    function LocalStockage(storage) {
        this.storage = storage;
    }
    /**
     * Méthode qui permet d'enregistrer des données localement. les données sont enregistrées par paire clé/valeur.
     * @method setData
     * @param {Objet} - un objet est passé à la méthode qui enregistre indépendemment chacune de ses propriétés.
     * @returns {Promise} - une promesse est renvoyée qui se termine lorsque l'ensemble des données a été enregistré.
     */
    LocalStockage.prototype.setData = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //Décomposition des propriétés de l'objet en paire clé/valeur
            for (var propertyName in data) {
                //console.log(propertyName + ' en cours d\'enregistrement : ' + data[propertyName]);
                _this.storage.set(propertyName, data[propertyName]); //Enregistrement de la paire clé/valeur
            }
            resolve('enregistré !');
        });
    };
    /**
     * Méthode qui récupère une donnée stockée localement à partir de sa clé.
     * @method getData
     * @param {string} - le nom de la clé identifiant la donnée stockée.
     * @returns {promise} - une promesse est renvoyée qui se termine lorsque la donnée est récupérée.
     */
    LocalStockage.prototype.getData = function (data) {
        return this.storage.get(data);
    };
    /**
     * Méthode qui permet de supprimer des données stockées localement. Seul l'identifiant d'un formulaire n'est pas supprimé.
     * @method removeData
     * @param {Objet} - l'objet dont les valeurs des propriétés doivent être supprimées.
     * @returns {Promise} - une promesse est renvoyée qui se termine lorsque les données sont supprimées.
     */
    LocalStockage.prototype.removeData = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            for (var propertyName in data) {
                //L'identifiant unique, qui peut être une des propriétés de l'objet data, n'est pas supprimé.
                if (propertyName != "idForm") {
                    _this.storage.remove(propertyName).then(function () {
                        console.log('donnée supprimée');
                    });
                    console.log(propertyName + ' supprimée');
                }
            }
            resolve('Supression des données');
        });
    };
    /**
     * Méthode qui récupère l'ensemble des données stockées localement, sauf l'identifiant du formulaire.
     * @method getAllData
     * @param {} - aucun paramètre n'est passé à la méthode.
     * @returns {Promise} - une promesse est renvoyée avec les valeurs des donnés stockées sous la forme d'un objet.
     */
    LocalStockage.prototype.getAllData = function () {
        var _this = this;
        var data = {};
        return new Promise(function (resolve, reject) {
            _this.storage.forEach(function (value, key, index) {
                if (typeof key === 'string' && key.endsWith('Form') && key != "idForm") {
                    data[key] = value;
                    console.log('la valeur est ' + value + ' et la key est ' + key);
                }
            });
            resolve(data);
        });
    };
    /**
     * Méthode qui supprime TOUTES les données stockées localement.
     * @method clearAllData
     * @param {} - aucun paramètre n'est passé à la méthode.
     * @returns {Promise} - une promesse est renvoyée lorsque toutes les données sont supprimées.
     */
    LocalStockage.prototype.clearAllData = function () {
        return this.storage.clear();
    };
    return LocalStockage;
}());
LocalStockage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
], LocalStockage);

//# sourceMappingURL=localstockage.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Accueil; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__formulaire_donnees_perso_donnees_perso__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_formulaire__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_localstockage__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Accueil = (function () {
    function Accueil(navCtrl, formulaire, localstockage) {
        this.navCtrl = navCtrl;
        this.formulaire = formulaire;
        this.localstockage = localstockage;
    }
    /**
     * Fonction qui est liée au bouton "Commencer le formulaire" sur la page d'accueil.
     * Elle récupère la date et l'heure au moment où le bouton est cliqué et stocke cette valeur localement.
     * Une fois cette valeur stockée, elle crée un nouveau formulaire et affiche la première page du formulaire - Données Personnelles.
     * @method nextPage
     * @requires providers/localstockage - la fonction utilise la méthode setData.
     * @requires providers/formulaire - la fonction utilise la méthode createForm.
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    Accueil.prototype.nextPage = function () {
        var _this = this;
        ;
        var currentTime = new Date();
        var dateCreaForm = { dateForm: currentTime.getFullYear() * 100000000 + (currentTime.getMonth() + 1) * 1000000 + currentTime.getDate() * 10000 + currentTime.getHours() * 100 + currentTime.getMinutes() };
        //Stockage local de la date de création du nouveau formulaire après avoir supprimer toutes les données déjà stockées
        this.localstockage.clearAllData().then(function () {
            _this.localstockage.setData(dateCreaForm).then(function (message) {
                console.log('Date de création du formulaire : ' + message);
                //Création d'un nouveau formulaire. La première donnée à entrer dans le formulaire est la date de création.
                _this.formulaire.createForm(dateCreaForm);
                //Navigation à la première page du formulaire - Données personnelles
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__formulaire_donnees_perso_donnees_perso__["a" /* DonneesPerso */]);
            });
        });
    };
    return Accueil;
}());
Accueil = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'accueil',template:/*ion-inline-start:"/home/s/Work/Medecine/phytosafe/src/pages/accueil/accueil.html"*/'<ion-content scroll="false">\n  <p>{{ \'FONCTION_APPLI\' | translate }}</p>\n  <p>{{ \'DISCLAIMER_APPLI\' | translate }}</p>\n  <p>{{ \'CONFIDENTIALITE_APPLI\' | translate }}</p>\n  <div padding>\n    <button class="ButtonValide" ion-button icon-end large clear (click)="nextPage()">\n      {{ \'DEBUT_BOUTON\' | translate }}\n      <ion-icon name="arrow-forward"></ion-icon>\n    </button>\n  </div>\n</ion-content>'/*ion-inline-end:"/home/s/Work/Medecine/phytosafe/src/pages/accueil/accueil.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_formulaire__["a" /* Formulaire */], __WEBPACK_IMPORTED_MODULE_4__providers_localstockage__["a" /* LocalStockage */]])
], Accueil);

//# sourceMappingURL=accueil.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DonneesPerso; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__maladie_maladie__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_inactif__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_formulaire__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_localstockage__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DonneesPerso = (function () {
    function DonneesPerso(navCtrl, alertCtrl, translate, formBuilder, inactif, formulaire, localstockage) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.inactif = inactif;
        this.formulaire = formulaire;
        this.localstockage = localstockage;
        this.submitAttempt = false;
        //Construction du formulaire qui sera rempli sur cette page
        this.donneesPersoForm = formBuilder.group({
            prenomForm: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)'), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].required])],
            nomForm: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)'), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].required])],
            date_naissanceForm: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].required]
        });
        //Si l'utilisateur est inactif, une alerte est envoyée avec la possibilité de continuer ou de recommencer le questionnaire.
        //inactif.idleSet(navCtrl,alertCtrl);
    }
    /**
     * Fonction qui est liée au bouton "Continuer" sur la première page du formulaire - Données personnelles.
     * Elle valide les valeurs entrées dans les champs du formulaire et les stocke localement.
     * Une fois ces valeurs stockées, elle récupère la valeur stockée correspondant à l'identificant du formulaire.
     * Si aucun identifiant n'a été stocké, elle créé un nouveau formulaire avec toutes les données stockées. Sinon, elle met à jour le formulaire avec ces mêmes données.
     * Elle affiche ensuite la deuxième page du formulaire - Maladie.
     * @method nextPage
     * @requires providers/localstockage - la fonction utilise les méthodes setData, getData, getAllData.
     * @requires providers/formulaire - la fonction utilise les méthodes createForm et updateForm.
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    DonneesPerso.prototype.nextPage = function () {
        var _this = this;
        this.submitAttempt = true;
        if (this.donneesPersoForm.valid) {
            //Stockage local des données remplies dans cette page de formulaire
            this.localstockage.setData(this.donneesPersoForm.value).then(function (message) {
                console.log('Données Personnelles : ' + message);
                //Mise à jour/création du formulaire sur le serveur avec les données entrées sur cette page du formulaire
                _this.localstockage.getData("idForm").then(function (val) {
                    _this.localstockage.getAllData().then(function (dataForm) {
                        //il faut créer/mettre à jour le formulaire avec toutes les données stockées
                        if (val == null) {
                            //Si le formulaire n'a pas été créé, il faut le créer
                            _this.formulaire.createForm(dataForm);
                        }
                        else {
                            //Sinon, il faut le mettre à jour
                            _this.formulaire.updateForm(val, dataForm);
                        }
                    });
                });
                //Navigation à la deuxième page du formulaire - Maladie
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__maladie_maladie__["a" /* Maladie */]);
            });
        }
    };
    return DonneesPerso;
}());
DonneesPerso = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'donnees-perso',template:/*ion-inline-start:"/home/s/Work/Medecine/phytosafe/src/pages/formulaire/donnees-perso/donnees-perso.html"*/'<ion-header no-shadow>\n  <ion-navbar>\n    <ion-title>\n      <h2 class="slide-title">{{ \'FORM_DONNEES_PERSONNELLES\' | translate }}</h2>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-bounce>\n  <p *ngIf="!donneesPersoForm.valid && submitAttempt" class="FormAlerte">{{ \'FORM_ALERTE\' | translate }}</p>\n  <form [formGroup]="donneesPersoForm" novalidate>\n    \n    <ion-item no-lines>\n      <ion-label floating>{{ \'FORM_PRENOM\' | translate }}</ion-label>\n      <ion-input [class.invalid]="!donneesPersoForm.controls.prenomForm.valid && (donneesPersoForm.controls.prenomForm.dirty || submitAttempt)" formControlName="prenomForm" type="text"></ion-input>\n    </ion-item>\n    <p *ngIf="!donneesPersoForm.controls.prenomForm.valid  && (donneesPersoForm.controls.prenomForm.dirty || submitAttempt)">{{ \'FORM_PRENOM_ALERTE\' | translate }}</p>\n    \n    <ion-item no-lines>\n      <ion-label floating>{{ \'FORM_NOM\' | translate }}</ion-label>\n      <ion-input [class.invalid]="!donneesPersoForm.controls.nomForm.valid && (donneesPersoForm.controls.nomForm.dirty || submitAttempt)" formControlName="nomForm" type="text"></ion-input>\n    </ion-item>\n    <p *ngIf="!donneesPersoForm.controls.nomForm.valid  && (donneesPersoForm.controls.nomForm.dirty || submitAttempt)">{{ \'FORM_NOM_ALERTE\' | translate }}</p>\n\n    <ion-item no-lines>\n      <ion-label floating>{{ \'FORM_DATE_NAISSANCE\' | translate }}</ion-label>\n      <ion-datetime cancelText="annuler" doneText="valider" [class.invalid]="!donneesPersoForm.controls.date_naissanceForm.valid && (donneesPersoForm.controls.date_naissanceForm.dirty || submitAttempt)" formControlName="date_naissanceForm" displayFormat="DD MMM YYYY" \n        monthShortNames="jan, f\u00e9v, mars, avr, mai, juin, juil, ao\u00fbt, sept, oct, nov, d\u00e9c">\n      </ion-datetime>\n    </ion-item>\n    <p *ngIf="!donneesPersoForm.controls.date_naissanceForm.valid  && (donneesPersoForm.controls.date_naissanceForm.dirty || submitAttempt)">{{ \'FORM_DATE_NAISSANCE_ALERTE\' | translate }}</p>\n\n  </form>\n  <button class="ButtonValide" ion-button icon-end large clear (click)="nextPage()">\n    {{ \'CONTINUE_BOUTON\' | translate }}\n    <ion-icon name="arrow-forward"></ion-icon>\n  </button>\n</ion-content>\n'/*ion-inline-end:"/home/s/Work/Medecine/phytosafe/src/pages/formulaire/donnees-perso/donnees-perso.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_5__providers_inactif__["a" /* Inactif */], __WEBPACK_IMPORTED_MODULE_6__providers_formulaire__["a" /* Formulaire */], __WEBPACK_IMPORTED_MODULE_7__providers_localstockage__["a" /* LocalStockage */]])
], DonneesPerso);

//# sourceMappingURL=donnees-perso.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Maladie; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__therapies_alter_therapies_alter__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__autocomplete_autocomplete__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_formulaire__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_localstockage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_traitement__ = __webpack_require__(143);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var Maladie = (function () {
    function Maladie(navCtrl, modalCtrl, translate, formBuilder, formulaire, localstockage, traitement) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.translate = translate;
        this.formBuilder = formBuilder;
        this.formulaire = formulaire;
        this.localstockage = localstockage;
        this.traitement = traitement;
        this.submitAttempt = false;
        this.organeNom = [
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
        this.traitementNom = [];
        this.maladieForm = formBuilder.group({
            organeForm: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)'), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].required])],
            diagnosticForm: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].required],
            etatForm: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].required],
            traitementForm: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]*)'), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].required])],
            radioForm: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].required],
            oncoForm: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ. ]*)([\-]?)([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)')])]
        });
    }
    Maladie.prototype.ngOnInit = function () {
        var _this = this;
        this.traitement.getTrait().toPromise().then(function (res) {
            _this.traitementNom = [res.blob]; //A VERIFIER - BLOB PERMET DE RETROUVER LE BODY DE LA REPONSE!!
        }).catch(function (err) {
            console.error('ERROR', err);
        });
    };
    /**
     * Fonction qui est liée au champ "Organe primitif atteint" sur la deuxième page du formulaire - Maladie.
     * Elle permet d'ouvrir une page modale (pages/autocomplete) qui propose, en fonction des entrées de l'utilisateur une liste de noms possibles : autocompletion.
     * @method showOrganeModal
     * @requires pages/autocomplete - elle appelle la page autocomplete.ts.
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    Maladie.prototype.showOrganeModal = function () {
        var _this = this;
        this.translate.get('TITRE_MODAL_ORGANE').subscribe(function (value) {
            _this.organeTitre = value;
        });
        this.translate.get('PLACEHOLDER_MODAL_ORGANE').subscribe(function (value) {
            _this.organePlaceholder = value;
        });
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__autocomplete_autocomplete__["a" /* Autocomplete */], { dataAutocomplete: this.organeNom, titreAutocomplete: this.organeTitre, placeholderAutocomplete: this.organePlaceholder, enterAutocomplete: true });
        modal.onDidDismiss(function (data) {
            //console.log(data);
            _this.maladieForm.patchValue({ organeForm: data });
        });
        modal.present();
    };
    /**
     * Fonction qui est liée au champ "Nom du traitement anti-cancéreux" sur la deuxième page du formulaire - Maladie.
     * Elle permet d'ouvrir une page modale (pages/autocomplete) qui propose, en fonction des entrées de l'utilisateur une liste de noms possibles : autocompletion.
     * @method showOrganeModal
     * @requires pages/autocomplete - elle appelle la page autocomplete.ts.
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    Maladie.prototype.showTraitementModal = function () {
        var _this = this;
        //console.log(this.traitementNom);
        if (this.traitementNom.length > 0) {
            this.translate.get('TITRE_MODAL_TRAITEMENT').subscribe(function (value) {
                _this.traitementTitre = value;
            });
            this.translate.get('PLACEHOLDER_MODAL_TRAITEMENT').subscribe(function (value) {
                _this.traitementPlaceholder = value;
            });
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__autocomplete_autocomplete__["a" /* Autocomplete */], { dataAutocomplete: this.traitementNom, titreAutocomplete: this.traitementTitre, placeholderAutocomplete: this.traitementPlaceholder, enterAutocomplete: false });
            modal.onDidDismiss(function (data) {
                //console.log(data);
                _this.maladieForm.patchValue({ traitementForm: data });
            });
            modal.present();
        }
        ;
    };
    /**
     * Fonction qui est liée au bouton "Continuer" sur la deuxième page du formulaire - Maladie.
     * Elle valide les valeurs entrées dans les champs du formulaire et les stocke localement.
     * Une fois ces valeurs stockées, elle récupère la valeur stockée correspondant à l'identificant du formulaire.
     * Si aucun identifiant n'a été stocké, elle créé un nouveau formulaire avec toutes les données stockées. Sinon, elle met à jour le formulaire avec ces mêmes données.
     * Elle affiche ensuite la troisième page du formulaire - Traitements Alternatifs.
     * @method nextPage
     * @requires providers/localstockage - la fonction utilise les méthodes setData, getData, getAllData.
     * @requires providers/formulaire - la fonction utilise les méthodes createForm et updateForm.
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    Maladie.prototype.nextPage = function () {
        var _this = this;
        this.submitAttempt = true;
        if (this.maladieForm.valid) {
            //Stockage local des données remplies dans cette page de formulaire
            this.localstockage.setData(this.maladieForm.value).then(function (message) {
                console.log('Maladie : ' + message);
                //Mise à jour/création du formulaire sur le serveur avec les données entrées sur cette page du formulaire
                _this.localstockage.getData("idForm").then(function (val) {
                    _this.localstockage.getAllData().then(function (dataForm) {
                        //il faut créer/mettre à jour le formulaire avec toutes les données stockées
                        if (val == null) {
                            //Si le formulaire n'a pas été créé, il faut le créer
                            _this.formulaire.createForm(dataForm);
                        }
                        else {
                            //Sinon, il faut le mettre à jour
                            _this.formulaire.updateForm(val, dataForm);
                        }
                    });
                });
                //Navigation à la troisième page du formulaire - Traitements Alternatifs
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__therapies_alter_therapies_alter__["a" /* TherapiesAlter */]);
            });
        }
    };
    return Maladie;
}());
Maladie = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'maladie',template:/*ion-inline-start:"/home/s/Work/Medecine/phytosafe/src/pages/formulaire/maladie/maladie.html"*/'<ion-header no-shadow>\n  <ion-navbar>\n    <ion-title>\n      <h2 class="slide-title">{{ \'FORM_MALADIE\' | translate }}</h2>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-bounce>\n  <p *ngIf="!maladieForm.valid && submitAttempt" class="FormAlerte">{{ \'FORM_ALERTE\' | translate }}</p>\n  <form [formGroup]="maladieForm" novalidate>\n\n    <ion-item no-lines>\n      <ion-label floating>{{ \'FORM_ORGANE_PRIMITIF\' | translate }}</ion-label>\n      <ion-input (click)="showOrganeModal()" [class.invalid]="!maladieForm.controls.organeForm.valid && (maladieForm.controls.organeForm.dirty || submitAttempt)" formControlName="organeForm" type="text"></ion-input>\n    </ion-item>\n    <p *ngIf="!maladieForm.controls.organeForm.valid  && (maladieForm.controls.organeForm.dirty || submitAttempt)">{{ \'FORM_ORGANE_PRIMITIF_ALERTE\' | translate }}</p>\n\n    <ion-item no-lines>\n      <ion-label floating>{{ \'FORM_DATE_DIAGNOSTIC\' | translate }}</ion-label>\n      <ion-datetime cancelText="annuler" doneText="valider" [class.invalid]="!maladieForm.controls.diagnosticForm.valid && (maladieForm.controls.diagnosticForm.dirty || submitAttempt)" formControlName="diagnosticForm" displayFormat="DD MMM YYYY" \n        monthShortNames="jan, f\u00e9v, mars, avr, mai, juin, juil, ao\u00fbt, sept, oct, nov, d\u00e9c">\n      </ion-datetime>\n    </ion-item>\n    <p *ngIf="!maladieForm.controls.diagnosticForm.valid  && (maladieForm.controls.diagnosticForm.dirty || submitAttempt)">{{ \'FORM_DATE_DIAGNOSTIC_ALERTE\' | translate }}</p>\n\n    <ion-list radio-group formControlName="etatForm">\n      <p>{{ \'FORM_MALADIE_CHECK\' | translate }}</p>\n      <ion-item no-lines>\n        <ion-label [class.invalid-bis]="!maladieForm.controls.etatForm.valid && (maladieForm.controls.etatForm.dirty || submitAttempt)">{{ \'FORM_MALADIE_OPTION_1\' | translate }}</ion-label>\n        <ion-radio value="{{ \'FORM_MALADIE_OPTION_1\' | translate }}" [class.invalid-bis]="!maladieForm.controls.etatForm.valid && (maladieForm.controls.etatForm.dirty || submitAttempt)"></ion-radio>\n      </ion-item>\n      <ion-item no-lines>\n        <ion-label [class.invalid-bis]="!maladieForm.controls.etatForm.valid && (maladieForm.controls.etatForm.dirty || submitAttempt)">{{ \'FORM_MALADIE_OPTION_2\' | translate }}</ion-label>\n        <ion-radio value="{{ \'FORM_MALADIE_OPTION_2\' | translate }}" [class.invalid-bis]="!maladieForm.controls.etatForm.valid && (maladieForm.controls.etatForm.dirty || submitAttempt)"></ion-radio>\n      </ion-item>\n    </ion-list>\n    <p *ngIf="!maladieForm.controls.etatForm.valid  && (maladieForm.controls.etatForm.dirty || submitAttempt)">{{ \'FORM_OPTION_ALERTE\' | translate }}</p>\n\n    <ion-item no-lines>\n      <ion-label floating>{{ \'FORM_NOM_TRAITEMENT\' | translate }}</ion-label>\n      <ion-input (click)="showTraitementModal()" [class.invalid]="!maladieForm.controls.traitementForm.valid && (maladieForm.controls.traitementForm.dirty || submitAttempt)" formControlName="traitementForm" type="text"></ion-input>\n    </ion-item>\n    <p *ngIf="!maladieForm.controls.traitementForm.valid  && (maladieForm.controls.traitementForm.dirty || submitAttempt)">{{ \'FORM_NOM_TRAITEMENT_ALERTE\' | translate }}</p>\n\n    <ion-list radio-group formControlName="radioForm">\n      <p>{{ \'FORM_RADIO_CHECK\' | translate }}</p>\n      <ion-item no-lines>\n        <ion-label [class.invalid-bis]="!maladieForm.controls.radioForm.valid && (maladieForm.controls.radioForm.dirty || submitAttempt)">{{ \'FORM_RADIO_OPTION_1\' | translate }}</ion-label>\n        <ion-radio value="{{ \'FORM_RADIO_OPTION_1\' | translate }}" [class.invalid-bis]="!maladieForm.controls.radioForm.valid && (maladieForm.controls.radioForm.dirty || submitAttempt)"></ion-radio>\n      </ion-item>\n      <ion-item no-lines>\n        <ion-label [class.invalid-bis]="!maladieForm.controls.radioForm.valid && (maladieForm.controls.radioForm.dirty || submitAttempt)">{{ \'FORM_RADIO_OPTION_2\' | translate }}</ion-label>\n        <ion-radio value="{{ \'FORM_RADIO_OPTION_2\' | translate }}" [class.invalid-bis]="!maladieForm.controls.radioForm.valid && (maladieForm.controls.radioForm.dirty || submitAttempt)"></ion-radio>\n      </ion-item>\n      <ion-item no-lines>\n        <ion-label [class.invalid-bis]="!maladieForm.controls.radioForm.valid && (maladieForm.controls.radioForm.dirty || submitAttempt)">{{ \'FORM_RADIO_OPTION_3\' | translate }}</ion-label>\n        <ion-radio value="{{ \'FORM_RADIO_OPTION_3\' | translate }}" [class.invalid-bis]="!maladieForm.controls.radioForm.valid && (maladieForm.controls.radioForm.dirty || submitAttempt)"></ion-radio>\n      </ion-item>\n    </ion-list>\n    <p *ngIf="!maladieForm.controls.radioForm.valid  && (maladieForm.controls.radioForm.dirty || submitAttempt)">{{ \'FORM_OPTION_ALERTE\' | translate }}</p>\n    \n    <ion-item no-lines>\n      <ion-label floating>{{ \'FORM_ONCO_REF\' | translate }}</ion-label>\n      <ion-input [class.invalid]="!maladieForm.controls.oncoForm.valid && (maladieForm.controls.oncoForm.dirty || submitAttempt)" formControlName="oncoForm" type="text"></ion-input>\n    </ion-item>\n    <p *ngIf="!maladieForm.controls.oncoForm.valid  && (maladieForm.controls.oncoForm.dirty || submitAttempt)">{{ \'FORM_ONCO_REF_ALERTE\' | translate }}</p>\n\n  </form>\n  <button class="ButtonValide" ion-button icon-end large clear (click)="nextPage()">\n    {{ \'CONTINUE_BOUTON\' | translate }}\n    <ion-icon name="arrow-forward"></ion-icon>\n  </button>\n</ion-content>\n'/*ion-inline-end:"/home/s/Work/Medecine/phytosafe/src/pages/formulaire/maladie/maladie.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_6__providers_formulaire__["a" /* Formulaire */], __WEBPACK_IMPORTED_MODULE_7__providers_localstockage__["a" /* LocalStockage */], __WEBPACK_IMPORTED_MODULE_8__providers_traitement__["a" /* Traitement */]])
], Maladie);

//# sourceMappingURL=maladie.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TherapiesAlter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__traitement_nom_traitement_nom__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__resultats_resultats__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_formulaire__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_localstockage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_validators__ = __webpack_require__(271);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TherapiesAlter = (function () {
    function TherapiesAlter(navCtrl, translate, formBuilder, formulaire, localstockage) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.formulaire = formulaire;
        this.localstockage = localstockage;
        this.submitAttempt = false;
        this.questionsTherapie = false;
        this.checkAutres = false;
        this.therapiesAlterForm = formBuilder.group({
            therapiesForm: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].required],
            phytoForm: [false],
            homeoForm: [false],
            aromaForm: [false],
            autres: [false],
            autresForm: ['']
        }, { validator: __WEBPACK_IMPORTED_MODULE_8__providers_validators__["a" /* TherapieValidator */].isValid });
    }
    /**
     * Fonction qui permet le déploiement d'un menu proposant différentes thérapies alternatives, après que l'utilisateur ait dit avoir recours à des thérapies alternatives.
     * @method therapieOui
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    TherapiesAlter.prototype.therapieOui = function () {
        this.questionsTherapie = true;
    };
    /**
     * Fonction qui supprime le menu proposant différentes thérapies alternatives, après que l'utilisateur ait dit ne pas avoir recours à des thérapies alternatives.
     * @method therapieNon
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    TherapiesAlter.prototype.therapieNon = function () {
        this.questionsTherapie = false;
        this.therapiesAlterForm.controls.phytoForm.setValue(false);
        this.therapiesAlterForm.controls.homeoForm.setValue(false);
        this.therapiesAlterForm.controls.aromaForm.setValue(false);
        this.therapiesAlterForm.controls.autres.setValue(false);
        this.therapiesAlterForm.controls.autresForm.setValue('');
    };
    /**
     * Fonction qui permet le déploiement d'un champ permettant d'entrer le nom d'une thérapie alternative, après que l'utilisateur ait dit avoir recours à des thérapies alternatives qui ne sont pas listées dans le formulaire.
     * @method autres
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    TherapiesAlter.prototype.autres = function () {
        if (this.checkAutres == false) {
            this.checkAutres = true;
        }
        else {
            this.checkAutres = false;
            this.therapiesAlterForm.controls.autres.setValue(false);
            this.therapiesAlterForm.controls.autresForm.setValue('');
        }
    };
    /**
     * Fonction qui est liée au bouton "Continuer" sur la troisième page du formulaire - Thérapies Alternatives.
     * Elle valide les valeurs entrées dans les champs du formulaire et les stocke localement.
     * Une fois ces valeurs stockées, elle récupère la valeur stockée correspondant à l'identificant du formulaire.
     * Si aucun identifiant n'a été stocké, elle créé un nouveau formulaire avec toutes les données stockées. Sinon, elle met à jour le formulaire avec ces mêmes données.
     * Elle affiche ensuite la quatrième page du formulaire si l'utilisateur utilise au moins une thérapie alternative - Nom des Thérapies. Sinon, elle affiche ensuite la page des résultats - Résultats.
     * @method nextPage
     * @requires providers/localstockage - la fonction utilise les méthodes setData, getData, getAllData.
     * @requires providers/formulaire - la fonction utilise les méthodes createForm et updateForm.
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    TherapiesAlter.prototype.nextPage = function () {
        var _this = this;
        this.submitAttempt = true;
        if (this.therapiesAlterForm.valid) {
            //Stockage local des données remplies dans cette page de formulaire
            this.localstockage.setData(this.therapiesAlterForm.value).then(function (message) {
                console.log('Thérapies alternatives : ' + message);
                //Mise à jour/création du formulaire sur le serveur avec les données entrées sur cette page du formulaire
                _this.localstockage.getData("idForm").then(function (val) {
                    _this.localstockage.getAllData().then(function (dataForm) {
                        //il faut créer/mettre à jour le formulaire avec toutes les données stockées
                        if (val == null) {
                            //Si le formulaire n'a pas été créé, il faut le créer
                            _this.formulaire.createForm(dataForm);
                        }
                        else {
                            //Sinon, il faut le mettre à jour
                            _this.formulaire.updateForm(val, dataForm);
                        }
                    });
                });
                //Navigation qui dépend de la saisie de l'utilisateur.
                if (_this.therapiesAlterForm.controls.phytoForm.value) {
                    //Si l'utilisateur utilise au moin une thérapie alternative, navigation à la quatrième page du formulaire pour entrer le nom des thérapies. 
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__traitement_nom_traitement_nom__["a" /* TraitementNom */]);
                }
                else {
                    //Si l'utilisateur n'utilise aucune thérapie alternative, navigation à la page des résultats du formulaire.
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__resultats_resultats__["a" /* Resultats */]);
                }
            });
        }
    };
    return TherapiesAlter;
}());
TherapiesAlter = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'therapies-alter',template:/*ion-inline-start:"/home/s/Work/Medecine/phytosafe/src/pages/formulaire/therapies-alter/therapies-alter.html"*/'<ion-header no-shadow>\n  <ion-navbar>\n    <ion-title>\n      <h2 class="slide-title">{{ \'FORM_THERAPIES_ALTERNATIVES\' | translate }}</h2>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-bounce>\n  <p *ngIf="!therapiesAlterForm.valid && submitAttempt" class="FormAlerte">{{ \'FORM_ALERTE\' | translate }}</p>\n  <form [formGroup]="therapiesAlterForm" novalidate>\n\n    <ion-list radio-group formControlName="therapiesForm">\n      <p>{{ \'FORM_THERAPIES_CHECK\' | translate }}</p>\n      <ion-item no-lines>\n        <ion-label [class.invalid-bis]="!therapiesAlterForm.controls.therapiesForm.valid && (therapiesAlterForm.controls.therapiesForm.dirty || submitAttempt)">{{ \'FORM_THERAPIE_OUI\' | translate }}</ion-label>\n        <ion-radio (click)="therapieOui()" value="{{ \'FORM_THERAPIE_OUI\' | translate }}" [class.invalid-bis]="!therapiesAlterForm.controls.therapiesForm.valid && (therapiesAlterForm.controls.therapiesForm.dirty || submitAttempt)"></ion-radio>\n      </ion-item>\n      <ion-item no-lines>\n        <ion-label [class.invalid-bis]="!therapiesAlterForm.controls.therapiesForm.valid && (therapiesAlterForm.controls.therapiesForm.dirty || submitAttempt)">{{ \'FORM_THERAPIE_NON\' | translate }}</ion-label>\n        <ion-radio (click)="therapieNon()" value="{{ \'FORM_THERAPIE_NON\' | translate }}" [class.invalid-bis]="!therapiesAlterForm.controls.therapiesForm.valid && (therapiesAlterForm.controls.therapiesForm.dirty || submitAttempt)"></ion-radio>\n      </ion-item>\n    </ion-list>\n    <p *ngIf="!therapiesAlterForm.controls.therapiesForm.valid  && (therapiesAlterForm.controls.therapiesForm.dirty || submitAttempt)">{{ \'FORM_OPTION_ALERTE\' | translate }}</p>\n\n    <ion-list *ngIf="questionsTherapie">\n      <p>{{ \'FORM_THERAPIES_TYPES\' | translate }}</p>\n      <ion-item no-lines>\n        <ion-label>{{ \'FORM_THERAPIES_OPTION_1\' | translate }}</ion-label>\n        <ion-checkbox formControlName="phytoForm"></ion-checkbox>\n      </ion-item>\n      <ion-item no-lines>\n        <ion-label>{{ \'FORM_THERAPIES_OPTION_2\' | translate }}</ion-label>\n        <ion-checkbox formControlName="homeoForm"></ion-checkbox>\n      </ion-item>\n      <ion-item no-lines>\n        <ion-label>{{ \'FORM_THERAPIES_OPTION_3\' | translate }}</ion-label>\n        <ion-checkbox formControlName="aromaForm"></ion-checkbox>\n      </ion-item>\n      <ion-item no-lines>\n        <ion-label >{{ \'FORM_THERAPIES_OPTION_4\' | translate }}</ion-label>\n        <ion-checkbox formControlName="autres" (click)="autres()"></ion-checkbox>\n      </ion-item>\n      <ion-item no-lines *ngIf="checkAutres">\n        <ion-input [class.invalid]="!therapiesAlterForm.controls.autresForm.valid && (therapiesAlterForm.controls.autresForm.dirty || submitAttempt)" formControlName="autresForm" type="text"></ion-input>\n      </ion-item>\n    </ion-list>\n    <p *ngIf="questionsTherapie && (!therapiesAlterForm.valid && submitAttempt)">{{ \'FORM_CHECK_THERAPIE_ALERTE\' | translate }}</p>\n  \n  </form>\n  \n  <button class="ButtonValide" ion-button icon-end large clear (click)="nextPage()">\n    {{ \'CONTINUE_BOUTON\' | translate }}\n    <ion-icon name="arrow-forward"></ion-icon>\n  </button>\n</ion-content>\n'/*ion-inline-end:"/home/s/Work/Medecine/phytosafe/src/pages/formulaire/therapies-alter/therapies-alter.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_6__providers_formulaire__["a" /* Formulaire */], __WEBPACK_IMPORTED_MODULE_7__providers_localstockage__["a" /* LocalStockage */]])
], TherapiesAlter);

//# sourceMappingURL=therapies-alter.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TraitementNom; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resultats_resultats__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__autocomplete_autocomplete__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_formulaire__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_localstockage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_traitement__ = __webpack_require__(143);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TraitementNom = (function () {
    function TraitementNom(navCtrl, modalCtrl, translate, formBuilder, formulaire, localstockage, traitement) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.translate = translate;
        this.formBuilder = formBuilder;
        this.formulaire = formulaire;
        this.localstockage = localstockage;
        this.traitement = traitement;
        this.submitAttempt = false;
        this.checkTraitement = false;
        this.nbTraitement = 0;
        this.traitementTable = [];
        this.traitementNom = [];
        this.traitementNomForm = formBuilder.group({});
    }
    TraitementNom.prototype.ngOnInit = function () {
        this.createTraitObjet();
        this.traitementNomForm.addControl(this.traitementTable[0].phytonom, this.traitementTable[0].phytonomControl);
        this.traitementNomForm.addControl(this.traitementTable[0].phytodate, this.traitementTable[0].phytodateControl);
        /* this.traitement.getTrait().toPromise().then((res) => {
          this.traitementNom = [res.blob];//A VERIFIER - BLOB PERMET DE RETROUVER LE BODY DE LA REPONSE!!
        }).catch((err)=>{
          console.error('ERROR', err);
        }); */
    };
    /**
     * Fonction qui créé une paire nom du traitement/date de début du traitement et la stocke dans un tableau.
     * @method createTraitObjet
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    TraitementNom.prototype.createTraitObjet = function () {
        this.nbTraitement = this.nbTraitement + 1;
        ;
        var phytoForm = {
            phytonom: "phytonom_" + this.nbTraitement.toString() + "_Form",
            phytodate: "phytodate_" + this.nbTraitement.toString() + "_Form",
            phytonomControl: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].pattern('([a-zA-Zéèêëàäâùüûïîöôçÿ ]*)([\-]*)'), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["g" /* Validators */].required])),
            phytodateControl: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["b" /* FormControl */]('')
        };
        this.traitementTable.push(phytoForm);
    };
    /**
     * Fonction qui permet d'ajouter un traitement.
     * @method addPhyto
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    TraitementNom.prototype.addPhyto = function () {
        if (this.traitementNomForm.valid) {
            var i = this.traitementTable.length;
            this.createTraitObjet();
            // add phyto treatment to the list
            this.traitementNomForm.addControl(this.traitementTable[i].phytonom, this.traitementTable[i].phytonomControl);
            this.traitementNomForm.addControl(this.traitementTable[i].phytodate, this.traitementTable[i].phytodateControl);
            this.checkTraitement = false;
            this.submitAttempt = false;
        }
        else {
            this.checkTraitement = true;
        }
    };
    /**
     * Fonction qui permet de supprimer un traitement.
     * @method removePhyto
     * @requires providers/localstockage - la fonction utilise la méthode removeData.
     * @param {number} - le numéro du traitement à supprimer est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    TraitementNom.prototype.removePhyto = function (i) {
        // remove phyto treatment from the list
        var suppressionObjet = {};
        suppressionObjet[this.traitementTable[i].phytonom] = this.traitementNomForm.value[this.traitementTable[i].phytonom];
        suppressionObjet[this.traitementTable[i].phytodate] = this.traitementNomForm.value[this.traitementTable[i].phytodate];
        console.log(suppressionObjet);
        this.localstockage.removeData(suppressionObjet);
        this.traitementNomForm.removeControl(this.traitementTable[i].phytonom);
        this.traitementNomForm.removeControl(this.traitementTable[i].phytodate);
        this.traitementTable.splice(i, 1);
    };
    /**
     * Fonction qui est liée au champ "Nom du traitement" sur la page du formulaire - Nom des Thérapies.
     * Elle permet d'ouvrir une page modale (pages/autocomplete) qui propose, en fonction des entrées de l'utilisateur une liste de noms possibles : autocompletion.
     * @method showOrganeModal
     * @requires pages/autocomplete - elle appelle la page autocomplete.ts.
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {} - aucune valeur n'est retournée par la fonction.
     */
    TraitementNom.prototype.showTraitementModal = function (i) {
        var _this = this;
        //console.log(this.traitementNom);
        if (this.traitementNom.length > 0) {
            this.translate.get('TITRE_MODAL_TRAITEMENT_BIS').subscribe(function (value) {
                _this.traitementTitre = value;
            });
            this.translate.get('PLACEHOLDER_MODAL_TRAITEMENT').subscribe(function (value) {
                _this.traitementPlaceholder = value;
            });
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__autocomplete_autocomplete__["a" /* Autocomplete */], { dataAutocomplete: this.traitementNom, titreAutocomplete: this.traitementTitre, placeholderAutocomplete: this.traitementPlaceholder, enterAutocomplete: false });
            modal.onDidDismiss(function (data) {
                //console.log(data);
                var dataObj = {};
                dataObj[_this.traitementTable[i].phytonom] = data;
                _this.traitementNomForm.patchValue(dataObj);
            });
            modal.present();
        }
        ;
    };
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
    TraitementNom.prototype.nextPage = function () {
        var _this = this;
        this.submitAttempt = true;
        if (this.traitementNomForm.valid) {
            //Stockage local des données remplies dans cette page de formulaire
            this.localstockage.setData(this.traitementNomForm.value).then(function (message) {
                console.log('********************************************************');
                console.log('Nom des Thérapies : ' + message);
                //Mise à jour/création du formulaire sur le serveur avec les données entrées sur cette page du formulaire
                _this.localstockage.getData("idForm").then(function (val) {
                    _this.localstockage.getAllData().then(function (dataForm) {
                        //il faut créer/mettre à jour le formulaire avec toutes les données stockées
                        if (val == null) {
                            //Si le formulaire n'a pas été créé, il faut le créer
                            _this.formulaire.createForm(dataForm);
                        }
                        else {
                            //Sinon, il faut le mettre à jour
                            _this.formulaire.updateForm(val, dataForm);
                        }
                    });
                });
                //Navigation à la page des résultats du formulaire - Résultats
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__resultats_resultats__["a" /* Resultats */]);
            });
        }
    };
    return TraitementNom;
}());
TraitementNom = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'traitement-nom',template:/*ion-inline-start:"/home/s/Work/Medecine/phytosafe/src/pages/formulaire/traitement-nom/traitement-nom.html"*/'<ion-header no-shadow>\n  <ion-navbar>\n    <ion-title>\n      <h2 class="slide-title">{{ \'FORM_PHYTO\' | translate }}</h2>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-bounce>\n  <p *ngIf="!traitementNomForm.valid && (submitAttempt || checkTraitement)" class="FormAlerte">{{ \'FORM_ALERTE\' | translate }}</p>\n  \n  <form [formGroup]="traitementNomForm" novalidate>  \n    <div>\n      <ion-list class="row" no-lines *ngFor="let phytotmt of traitementTable; let i=index">\n        <ion-item no-lines>\n          <ion-label floating>{{ \'FORM_PHYTO_NOM\' | translate }}</ion-label>\n          <ion-input (click)="showTraitementModal(i)" [formControlName]=phytotmt.phytonom type="text" [class.invalid]="!phytotmt.phytonomControl.valid && (phytotmt.phytonomControl.dirty || submitAttempt || checkTraitement)"></ion-input>\n        </ion-item>\n        <ion-item no-lines>\n          <ion-label floating>{{ \'FORM_PHYTO_DATE\' | translate }}</ion-label>\n          <ion-datetime cancelText="annuler" doneText="valider" [formControlName]=phytotmt.phytodate displayFormat="DD MMM YYYY" \n            monthShortNames="jan, f\u00e9v, mars, avr, mai, juin, juil, ao\u00fbt, sept, oct, nov, d\u00e9c">\n          </ion-datetime>\n        </ion-item>\n        <ion-item class="ItemButtonClose" no-lines>\n          <button class="ButtonClose" *ngIf="traitementTable.length > 1" ion-button round clear (click)="removePhyto(i)">\n            <ion-icon class="IconClose" name="close"></ion-icon>\n          </button>\n        </ion-item>\n      </ion-list>\n      <p class="col" *ngIf="!traitementNomForm.valid && (submitAttempt || checkTraitement)">{{ \'FORM_PHYTO_NOM_ALERTE\' | translate }}</p>\n    </div>\n    <button ion-button icon-start medium clear (click)="addPhyto()">\n      <ion-icon name="add"></ion-icon>\n      {{ \'FORM_PHYTO_PLUS\' | translate }}\n    </button>\n  </form>\n\n  <button class="ButtonValide" ion-button icon-end large clear (click)="nextPage()">\n    {{ \'CONTINUE_BOUTON\' | translate }}\n    <ion-icon name="arrow-forward"></ion-icon>\n  </button>\n</ion-content>\n'/*ion-inline-end:"/home/s/Work/Medecine/phytosafe/src/pages/formulaire/traitement-nom/traitement-nom.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_6__providers_formulaire__["a" /* Formulaire */], __WEBPACK_IMPORTED_MODULE_7__providers_localstockage__["a" /* LocalStockage */], __WEBPACK_IMPORTED_MODULE_8__providers_traitement__["a" /* Traitement */]])
], TraitementNom);

//# sourceMappingURL=traitement-nom.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Diacritics; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * @class Diacritics - Ce service recence l'ensemble des caractères spéciaux qui peuvent être remplacés par des caractères simples lors d'une saisie de l'utilisateur.
 * Il facilite la comparaison entre les données saisies et celles attendues, notamment lors de l'autocompletion.
 */
var Diacritics = (function () {
    function Diacritics() {
        this.defaultDiacritics = [];
        this.defaultDiacritics = [
            { 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g },
            { 'base': 'AA', 'letters': /[\uA732]/g },
            { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g },
            { 'base': 'AO', 'letters': /[\uA734]/g },
            { 'base': 'AU', 'letters': /[\uA736]/g },
            { 'base': 'AV', 'letters': /[\uA738\uA73A]/g },
            { 'base': 'AY', 'letters': /[\uA73C]/g },
            { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g },
            { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g },
            { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g },
            { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g },
            { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g },
            { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g },
            { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g },
            { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g },
            { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g },
            { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g },
            { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g },
            { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g },
            { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g },
            { 'base': 'LJ', 'letters': /[\u01C7]/g },
            { 'base': 'Lj', 'letters': /[\u01C8]/g },
            { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g },
            { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g },
            { 'base': 'NJ', 'letters': /[\u01CA]/g },
            { 'base': 'Nj', 'letters': /[\u01CB]/g },
            { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g },
            { 'base': 'OI', 'letters': /[\u01A2]/g },
            { 'base': 'OO', 'letters': /[\uA74E]/g },
            { 'base': 'OU', 'letters': /[\u0222]/g },
            { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g },
            { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g },
            { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g },
            { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g },
            { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g },
            { 'base': 'TZ', 'letters': /[\uA728]/g },
            { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g },
            { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g },
            { 'base': 'VY', 'letters': /[\uA760]/g },
            { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g },
            { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g },
            { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g },
            { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g },
            { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g },
            { 'base': 'aa', 'letters': /[\uA733]/g },
            { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g },
            { 'base': 'ao', 'letters': /[\uA735]/g },
            { 'base': 'au', 'letters': /[\uA737]/g },
            { 'base': 'av', 'letters': /[\uA739\uA73B]/g },
            { 'base': 'ay', 'letters': /[\uA73D]/g },
            { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g },
            { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g },
            { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g },
            { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g },
            { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g },
            { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g },
            { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g },
            { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g },
            { 'base': 'hv', 'letters': /[\u0195]/g },
            { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g },
            { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g },
            { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g },
            { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g },
            { 'base': 'lj', 'letters': /[\u01C9]/g },
            { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g },
            { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g },
            { 'base': 'nj', 'letters': /[\u01CC]/g },
            { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g },
            { 'base': 'oi', 'letters': /[\u01A3]/g },
            { 'base': 'ou', 'letters': /[\u0223]/g },
            { 'base': 'oo', 'letters': /[\uA74F]/g },
            { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g },
            { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g },
            { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g },
            { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g },
            { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g },
            { 'base': 'tz', 'letters': /[\uA729]/g },
            { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g },
            { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g },
            { 'base': 'vy', 'letters': /[\uA761]/g },
            { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g },
            { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g },
            { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g },
            { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }
        ];
    }
    /**
     * Méthode qui envoie remplace l'ensemble des caractères spéciaux par leurs équivalents plus simples.
     * @method replaceDiacritics
     * @param {string} - une chaîne de caractère est passé à la méthode.
     * @returns {string} - une chaîne de caractère est renvoyée, dans laquelle tous les caractères spéciaux ont été remplacés.
     */
    Diacritics.prototype.replaceDiacritics = function (strVal) {
        for (var i = 0; i < this.defaultDiacritics.length; i++) {
            strVal = strVal.replace(this.defaultDiacritics[i].letters, this.defaultDiacritics[i].base);
        }
        return strVal;
    };
    return Diacritics;
}());
Diacritics = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], Diacritics);

//# sourceMappingURL=diacritics.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TherapieValidator; });
var TherapieValidator = (function () {
    function TherapieValidator() {
    }
    TherapieValidator.isValid = function (group) {
        var therapiesForm = group.controls.therapiesForm.value;
        var phytoForm = group.controls.phytoForm.value;
        var homeoForm = group.controls.homeoForm.value;
        var aromaForm = group.controls.aromaForm.value;
        var autres = group.controls.autres.value;
        var autresForm = group.controls.autresForm.value;
        if (therapiesForm == "oui") {
            if (autres && autresForm == '') {
                group.controls.autresForm.setErrors({ "autres_empty": true });
            }
            if (!phytoForm && !homeoForm && !aromaForm && !autres) {
                return {
                    "empty": true
                };
            }
            else {
                return null;
            }
        }
    };
    return TherapieValidator;
}());

//# sourceMappingURL=validators.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Inactif; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_idle_core__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__localstockage__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * @class Inactif - Ce service permet de vérifier si l'utilisateur est actif ou pas, et le cas échéant de le renvoyer vers la page d'accueil du formulaire.
 */
var Inactif = (function () {
    function Inactif(translate, idle, localstockage) {
        this.translate = translate;
        this.idle = idle;
        this.localstockage = localstockage;
        this.idleCount = 15; //Fixe le temps avant que l'utilisateur, une fois inactif, soit redirigé vers la page d'accueil.
        // Temps à partir duquel on estime que l'utilisateur est inactif.
        idle.setIdle(5);
        // Actions qui terminent l'inactivité.
        idle.setInterrupts(__WEBPACK_IMPORTED_MODULE_2__ng_idle_core__["a" /* DEFAULT_INTERRUPTSOURCES */]);
    }
    /**
     * Méthode qui lance la détection de l'inactivité de l'utilisateur, et qui, une fois l'inactivité détectée, ouvre une fenêtre d'alerte.
     * @method idleSet
     * @requires providers/inactif - la fonction utilise la méthode idleRedirectConfirm.
     * @param {Controller, Controller} - les deux controlleurs, qui correspondent à la page sur laquelle l'utilisateur est présent et à la fenêtre d'alerte sont passées à la méthode.
     * @returns {} - aucune valeur n'est retournée par la méthode.
     */
    Inactif.prototype.idleSet = function (navCtrl, alertCtrl) {
        var _this = this;
        this.idle.watch();
        this.idleState = this.idle.onIdleStart.subscribe(function () { return _this.idleRedirectConfirm(navCtrl, alertCtrl); });
    };
    /**
     * Méthode qui lance un timer.
     * @method idleTimer
     * @param {} - aucun paramètre n'est passé à la fonction.
     * @returns {Observable} - un observable est renvoyé pour suivre l'état du timer.
     */
    Inactif.prototype.idleTimer = function () {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].timer(0, 1000);
    };
    /**
     * Méthode qui ouvre une fenêtre d'alerte pour informer à l'utilisateur qu'il est inactif.
     * L'utilisateur peut soit confirmer la redirection vers la redirection vers la page d'accueil, soit l'annuler, soit attendre qu'il soit redirigé au terme d'un compte à rebours.
     * La redirection s'accompagne d'une suppression de toutes les données stockées localement.
     * @method idleRedirectConfirm
     * @requires providers/inactif - la fonction utilise la méthode idleSet, idleTimer.
     * @requires providers/localstockage - la fonction utilise la méthode clearAllData.
     * @param {Controller, Controller} - les deux controlleurs, qui correspondent à la page sur laquelle l'utilisateur est présent et à la fenêtre d'alerte sont passées à la méthode.
     * @returns {} - aucune valeur n'est retournée par la méthode.
     */
    Inactif.prototype.idleRedirectConfirm = function (navCtrl, alertCtrl) {
        var _this = this;
        //Arrêt de la détection de l'inactivité de l'utilisateur
        this.idleState.unsubscribe();
        this.idle.stop();
        //Création de la fenêtre d'alerte
        var buttonTextConfirm;
        var buttonTextCancel;
        this.translate.get('BOUTON_CONFIRM_ALERTE').subscribe(function (value) {
            buttonTextConfirm = value;
        });
        this.translate.get('BOUTON_ANNUL_ALERTE').subscribe(function (value) {
            buttonTextCancel = value;
        });
        var alert = alertCtrl.create({
            title: '',
            subTitle: '',
            message: '',
            buttons: [
                {
                    text: buttonTextConfirm,
                    handler: function () {
                        timer.unsubscribe();
                        alert.dismiss().then(function () {
                            navCtrl.popToRoot();
                        });
                        return false; //La fermeture de l'alerte est faite manuellement, par alert.dismiss(), une fois la suppression des données effectuées.
                    }
                },
                {
                    text: buttonTextCancel,
                    role: 'cancel',
                    handler: function () {
                        //Relance de la détection de l'inactivité de l'utilisateur
                        _this.idleSet(navCtrl, alertCtrl);
                        timer.unsubscribe();
                    }
                }
            ]
        });
        var titre;
        var message;
        this.translate.get('TITRE_ALERTE').subscribe(function (value) {
            titre = value;
        });
        this.translate.get('MESSAGE_ALERTE').subscribe(function (value) {
            message = value;
        });
        alert.setTitle(titre);
        alert.setMessage(message);
        //Création d'un compte à rebours qui, une fois à zéro, redirige l'utilisateur vers la page d'accueil du formulaire
        var timer = this.idleTimer().subscribe(function (t) {
            var count = _this.idleCount - t;
            if (count >= 0) {
                var sousTitrePrinc_1;
                var sousTitreUnit_1;
                _this.translate.get('SOUSTITRE_ALERTE').subscribe(function (value) {
                    sousTitrePrinc_1 = value;
                });
                _this.translate.get('SOUSTITRE_UNIT_ALERTE').subscribe(function (value) {
                    sousTitreUnit_1 = value;
                });
                alert.setSubTitle(sousTitrePrinc_1 + count + sousTitreUnit_1);
            }
            else {
                //La redirection vers la page d'accueil est précédé d'une suppression des données stockées localement
                timer.unsubscribe();
                alert.dismiss().then(function () {
                    navCtrl.popToRoot();
                });
            }
        });
        alert.present();
    };
    return Inactif;
}());
Inactif = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2__ng_idle_core__["b" /* Idle */], __WEBPACK_IMPORTED_MODULE_4__localstockage__["a" /* LocalStockage */]])
], Inactif);

//# sourceMappingURL=inactif.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(299);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpLoaderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_idle_core__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_accueil_accueil__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_formulaire_donnees_perso_donnees_perso__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_formulaire_maladie_maladie__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_formulaire_therapies_alter_therapies_alter__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_formulaire_traitement_nom_traitement_nom__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_formulaire_resultats_resultats__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_autocomplete_autocomplete__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_api__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_inactif__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_formulaire__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_localstockage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_diacritics__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_traitement__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_validators__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_splash_screen__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_status_bar__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ngx_translate_core__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ngx_translate_http_loader__ = __webpack_require__(609);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























// The translate loader needs to know where to load i18n files in Ionic's static asset pipeline.
function HttpLoaderFactory(http) {
    return new __WEBPACK_IMPORTED_MODULE_24__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_accueil_accueil__["a" /* Accueil */],
            __WEBPACK_IMPORTED_MODULE_8__pages_formulaire_donnees_perso_donnees_perso__["a" /* DonneesPerso */],
            __WEBPACK_IMPORTED_MODULE_9__pages_formulaire_maladie_maladie__["a" /* Maladie */],
            __WEBPACK_IMPORTED_MODULE_10__pages_formulaire_therapies_alter_therapies_alter__["a" /* TherapiesAlter */],
            __WEBPACK_IMPORTED_MODULE_11__pages_formulaire_traitement_nom_traitement_nom__["a" /* TraitementNom */],
            __WEBPACK_IMPORTED_MODULE_12__pages_formulaire_resultats_resultats__["a" /* Resultats */],
            __WEBPACK_IMPORTED_MODULE_13__pages_autocomplete_autocomplete__["a" /* Autocomplete */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_23__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_23__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: HttpLoaderFactory,
                    deps: [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]]
                }
            }),
            __WEBPACK_IMPORTED_MODULE_5__ng_idle_core__["c" /* NgIdleModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_accueil_accueil__["a" /* Accueil */],
            __WEBPACK_IMPORTED_MODULE_8__pages_formulaire_donnees_perso_donnees_perso__["a" /* DonneesPerso */],
            __WEBPACK_IMPORTED_MODULE_9__pages_formulaire_maladie_maladie__["a" /* Maladie */],
            __WEBPACK_IMPORTED_MODULE_10__pages_formulaire_therapies_alter_therapies_alter__["a" /* TherapiesAlter */],
            __WEBPACK_IMPORTED_MODULE_11__pages_formulaire_traitement_nom_traitement_nom__["a" /* TraitementNom */],
            __WEBPACK_IMPORTED_MODULE_12__pages_formulaire_resultats_resultats__["a" /* Resultats */],
            __WEBPACK_IMPORTED_MODULE_13__pages_autocomplete_autocomplete__["a" /* Autocomplete */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_14__providers_api__["a" /* Api */],
            __WEBPACK_IMPORTED_MODULE_15__providers_inactif__["a" /* Inactif */],
            __WEBPACK_IMPORTED_MODULE_16__providers_formulaire__["a" /* Formulaire */],
            __WEBPACK_IMPORTED_MODULE_17__providers_localstockage__["a" /* LocalStockage */],
            __WEBPACK_IMPORTED_MODULE_18__providers_diacritics__["a" /* Diacritics */],
            __WEBPACK_IMPORTED_MODULE_19__providers_traitement__["a" /* Traitement */],
            __WEBPACK_IMPORTED_MODULE_20__providers_validators__["a" /* TherapieValidator */],
            __WEBPACK_IMPORTED_MODULE_21__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_status_bar__["a" /* StatusBar */],
            // Keep this to enable Ionic's runtime error handling during development
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_accueil_accueil__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(translate, platform, statusBar, splashScreen, storage) {
        this.translate = translate;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.storage = storage;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_accueil_accueil__["a" /* Accueil */];
        this.initTranslate();
    }
    MyApp.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.storage.ready().then(function () {
                // Suppression des valeurs stockées localement au lancement de l'application
                _this.storage.clear().then(function () {
                    _this.statusBar.styleDefault();
                    _this.splashScreen.hide();
                });
            });
        });
    };
    MyApp.prototype.initTranslate = function () {
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('fr');
        if (this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
        }
        else {
            this.translate.use('fr'); // Set your language here
        }
    };
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        template: "<ion-nav [root]=\"rootPage\"></ion-nav>"
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Incompatibilite; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__localstockage__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * @class Incompatibilite - Ce service utilise les requêtes définies dans le fichier providers/api pour faire l'interface entre le client et le serveur (table incompatibilités notamment).
 * Les réponses du serveur aux requêtes envoyées sont des objets JSON, et doivent commencer par le champ `status` :
 * ```json
 * {
 *   status: 'success',
 *   resultats: {
 *     // ce champ doit contenir a minima l'id du formulaire, stocké sous le nom idForm.
 *   }
 * }
 * ```
 * Si le champ `status` n'est pas un `success`, une erreur est envoyée.
 */
var Incompatibilite = (function () {
    function Incompatibilite(http, api, localstockage) {
        this.http = http;
        this.api = api;
        this.localstockage = localstockage;
    }
    /**
     * Méthode qui envoie une requête GET pour récupérer la liste des incompatibilités liés à un formulaire.
     * @method getIncomp
     * @requires providers/localstockage - la fonction utilise la méthode setData.
     * @requires providers/api - la fonction utilise la méthode get.
     * @param {any} - l'identifiant du formulaire, idForm, est passé à la méthode.
     * @returns {Observable} - un observable est renvoyé pour suivre l'état de la requête.
     */
    Incompatibilite.prototype.getIncomp = function (idData) {
        //Il faut s'assurer qu'il n'y a déjà pas une requête en cours lorsqu'on envoie une requête de récupération de la liste des données.
        if (this.subCreate) {
            this.subCreate.unsubscribe();
        }
        var seq = this.api.get('incompatibilite', idData).share();
        this.subCreate = seq.map(function (res) { return res.json(); })
            .subscribe();
        return seq;
    };
    return Incompatibilite;
}());
Incompatibilite = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__api__["a" /* Api */], __WEBPACK_IMPORTED_MODULE_5__localstockage__["a" /* LocalStockage */]])
], Incompatibilite);

//# sourceMappingURL=incompatibilite.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Formulaire; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__localstockage__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * @class Formulaire - Ce service utilise les requêtes définies dans le fichier providers/api pour faire l'interface entre le client et le serveur.
 * Les réponses du serveur aux requêtes envoyées sont des objets JSON, et doivent commencer par le champ `status` :
 * ```json
 * {
 *   status: 'success',
 *   formres: {
 *     // ce champ doit contenir a minima l'id du formulaire, stocké sous le nom idForm.
 *   }
 * }
 * ```
 * Si le champ `status` n'est pas un `success`, une erreur est envoyée.
 */
var Formulaire = (function () {
    function Formulaire(http, api, localstockage) {
        this.http = http;
        this.api = api;
        this.localstockage = localstockage;
    }
    /**
     * Méthode qui envoie une requête POST pour créer un nouveau formulaire côté serveur.
     * La création d'un nouveau formulaire s'accompagne par la création d'un identifiant unique côté serveur, renvoyé dans la réponse du serveur.
     * @method createForm
     * @requires providers/localstockage - la fonction utilise les méthodes setData, removeData.
     * @requires providers/api - la fonction utilise la méthode post.
     * @param {Objet} - un objet est passé à la méthode qui va envoyer chacune des propriétés de l'objet au serveur.
     * @returns {Observable} - un observable est renvoyé pour suivre l'état de la requête.
     */
    Formulaire.prototype.createForm = function (dataForm) {
        var _this = this;
        //On ne peut créer qu'un seul formulaire côté serveur. Il faut s'assurer qu'il n'y a déjà pas une requête en cours lorsqu'on envoie une requête de création du formulaire.
        if (this.subCreate) {
            this.subCreate.unsubscribe();
        }
        var seq = this.api.post('formulaire', dataForm).share();
        this.subCreate = seq.map(function (res) { return res.json(); })
            .subscribe(function (res) {
            // Si la requête est un succès, l'identifiant du formulaire est stocké localement
            if (res.status == 'success') {
                _this.localstockage.setData(JSON.parse(res.formres)); // Le stockage de l'identifiant du formulaire doit avoir le nom idForm.
                _this.localstockage.removeData(dataForm); //Il faut ensuite supprimer toutes les données qui ont été enregistrées sur le serveur, sauf l'identifiant du formulaire.
            }
        }, function (err) {
            //console.error('ERROR', err);
        });
        return seq;
    };
    /**
     * Méthode qui envoie une requête PATCH pour mettre à jour le formulaire côté serveur.
     * @method updateForm
     * @requires providers/localstockage - la fonction utilise la méthode removeData.
     * @requires providers/api - la fonction utilise la méthode patch.
     * @param {any, Objet} - une variable avec la valeur de l'identifiant du formulaire et les données à mettre à jour, sous la forme d'un objet, sont passées à la méthode.
     * @returns {Observable} - un observable est renvoyé pour suivre l'état de la requête.
     */
    Formulaire.prototype.updateForm = function (idForm, dataForm) {
        var _this = this;
        //On doit s'assurer que les données mises à jour soient mise à jour dans le bon ordre : il est préférable d'annuler toute requête déjà existante.
        if (this.subCreate) {
            this.subCreate.unsubscribe();
        }
        var seq = this.api.patch('formulaire/' + idForm.toString(), dataForm).share();
        this.subCreate = seq.map(function (res) { return res.json(); })
            .subscribe(function (res) {
            if (res.status == 'success') {
                _this.localstockage.removeData(dataForm); //Il faut ensuite supprimer toutes les données qui ont été enregistrées sur le serveur, sauf l'identifiant du formulaire.
            }
        }, function (err) {
            //console.error('ERROR', err);
        });
        return seq;
    };
    return Formulaire;
}());
Formulaire = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__api__["a" /* Api */], __WEBPACK_IMPORTED_MODULE_5__localstockage__["a" /* LocalStockage */]])
], Formulaire);

//# sourceMappingURL=formulaire.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Api; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * @class Api - Ce service prend en charge les requêtes vers l'API REST côté client. Il faut, avant toute chose, déterminer l'URL de l'API.
 * Les données échangées doivent être en format JSON. Les données reçues doivent toujours commencer par le champ 'status' :
 * ```json
 * {
 *   status: 'success',
 *   formres: {
 *     // ce champ doit contenir a minima l'id du formulaire, stocké sous le nom idForm
 *   }
 * }
 * ```
 * Si le champ `status` n'est pas un `success`, une erreur est envoyée.
 */
var Api = (function () {
    function Api(http) {
        this.http = http;
        this.url = 'https://example.com/api/v1';
    }
    /**
     * Méthode qui envoie une requête GET à l'API pour récupérer des données.
     * @method get
     */
    Api.prototype.get = function (endpoint, params, options) {
        if (!options) {
            options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]();
        }
        // Support easy query params for GET requests
        if (params) {
            var p = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* URLSearchParams */]();
            for (var k in params) {
                p.set(k, params[k]);
            }
            // Set the search field if we have params and don't already have
            // a search field set in options.
            options.search = !options.search && p || options.search;
        }
        return this.http.get(this.url + '/' + endpoint, options);
    };
    /**
     * Méthode qui envoie une requête POST à l'API pour envoyer des données sur le serveur.
     * Cette méthode est utilisée lorsque l'URI pour accéder à la ressource n'est pas encore créée et sera créée côté serveur. Les données envoyées seront donc dans un sous-domaine de l'URI utilisée pour envoyer les données.
     * @method post
     */
    Api.prototype.post = function (endpoint, data, options) {
        var body;
        body = JSON.stringify(data);
        return this.http.post(this.url + '/' + endpoint, body, options);
    };
    /**
     * Méthode qui envoie une requête PUT à l'API pour envoyer des données sur le serveur.
     * Cette méthode est utilisée lorsque l'URI pour accéder à la ressource est déterminée par le client : c'est l'URI utilisée pour envoyer les données.
     * @method put
     */
    Api.prototype.put = function (endpoint, body, options) {
        return this.http.put(this.url + '/' + endpoint, body, options);
    };
    /**
     * Méthode qui envoie une requête DELETE à l'API pour supprimer des données sur le serveur.
     * @method delete
     */
    Api.prototype.delete = function (endpoint, options) {
        return this.http.delete(this.url + '/' + endpoint, options);
    };
    /**
     * Méthode qui envoie une requête PATCH à l'API pour envoyer des données sur le serveur.
     * Cette méthode est utilisée lorsque les données envoyées sont une mise à jour d'une ressource déjà identifiée. Les données correspondent donc à un format attendu.
     * @method patch
     */
    Api.prototype.patch = function (endpoint, data, options) {
        var body;
        body = JSON.stringify(data);
        return this.http.put(this.url + '/' + endpoint, body, options);
    };
    return Api;
}());
Api = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], Api);

//# sourceMappingURL=api.js.map

/***/ })

},[294]);
//# sourceMappingURL=main.js.map