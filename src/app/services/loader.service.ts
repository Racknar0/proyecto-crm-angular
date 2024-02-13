import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  loadingTriggered = new Subject<boolean>(); //! Se crea un subject

  setIsLoading(value: boolean): void {
    this.loadingTriggered.next(value); // Se emite un valor desde el subject
  }
}
