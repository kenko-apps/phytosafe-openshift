import { Injectable } from '@angular/core';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';

/**
 * Un service qui permet de vérifier si l'utilisateur est actif ou non.
 */
@Injectable()
export class Inactif {
  idleState = 'Not started.';
  timedOut = false;

  constructor(private idle: Idle) {
    // Temps à partir duquel on estime que l'utilisateur est inactif.
    idle.setIdle(5);
    // Temps compté après qu'un utilisateur soit devenu inactif pour le rediriger vers le début de l'application.
    idle.setTimeout(5);
    // Actions qui terminent l'inactivité.
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}
