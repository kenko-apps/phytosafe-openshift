# PhytoSafe : améliorer l'efficacité des traitements anti-cancéreux

PhytoSafe est une application permettant de mettre en évidence les incompatibilités entre les traitements cancéreux prescrits par le médecin et les thérapies alternatives prises par le patient, telles que les phytothérapies et les aromathérapies. Les incompatibilités sont révélées à partir d'un formulaire rempli par le patient.

Ce répertoire Github contient le code source de la partie front-end de l'application. Ce code a été écrit en utilisant le framework [Ionic](https://ionicframework.com/).

## Sommaire

1. [Installation](#installation)
2. [Composants de l'application](#composant)
3. [Fonctionnement](#fonctionnement)

## <a name="installation"></a>Installation

_Installation de Ionic_


_Installation de Git_


_Lancer l'application_



## <a name="composant"></a>Composants de l'application

L'application a été créée à partir du modèle "Ionic Super Starter". Plusieurs modules ont été ajoutés :

    * @ng-idle
Ce module permet de détecter lorsqu'un utilisateur n'est plus actif sur l'application. Pour l'installer, il faut écrire les commandes suivantes :

```bash
cd <nom_du_dossier>
npm install --save @ng-idle/core
```
Plus d'informations sur ce module peuvent être trouvées sur ce [lien](https://www.npmjs.com/package/ng2-idle).


## <a name="fonctionnement"></a>Fonctionnement

Dans cette première version de l'application, l'utilisateur ne peut pas s'identifier. Après un certain temps d'inactivité, alors que le formulaire a été commencé, il est demandé à l'utilisateur si c'est bien lui qui a commencé le formulaire. Si ce n'est pas 


### User

The `User` provider is used to authenticate users through its `login(accountInfo)` and `signup(accountInfo)` methods, which perform `POST` requests to an API endpoint that you will need to configure.

### Api

The `Api` provider is a simple CRUD frontend to an API. Simply put the root of your API url in the Api class and call get/post/put/patch/delete 

## i18n

Ionic Super Starter comes with internationalization (i18n) out of the box with [ngx-translate](https://github.com/ngx-translate/core). This makes it easy to change the text used in the app by modifying only one file. 

### Adding Languages

To add new languages, add new files to the `src/assets/i18n` directory, following the pattern of LANGCODE.json where LANGCODE is the language/locale code (ex: en/gb/de/es/etc.).

### Changing the Language

To change the language of the app, edit `src/app/app.component.ts` and modify `translate.use('en')` to use the LANGCODE from `src/assets/i18n/`
