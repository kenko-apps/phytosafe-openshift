import { Injectable } from '@angular/core';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Observable} from 'rxjs/Rx';

/**
 * Un service qui permet de vérifier si l'utilisateur est actif ou non.
 */
@Injectable()
export class Inactif {

  idleCount: number = 15;

  constructor(private idle: Idle) {
    // Temps à partir duquel on estime que l'utilisateur est inactif.
    idle.setIdle(5);
    // Actions qui terminent l'inactivité.
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
  }

  idleSet() {
    this.idle.watch();
  }

  idleStart(){
    return this.idle.onIdleStart;
  }

  idleTimer(){  
    return Observable.timer(0,1000);
  }
}
