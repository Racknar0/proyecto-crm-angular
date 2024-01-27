import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private openSidenavSubject = new Subject<void>();

  openSidenav$ = this.openSidenavSubject.asObservable();

  triggerOpenSidenav() {
    this.openSidenavSubject.next();
  }
}
