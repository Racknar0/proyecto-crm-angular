import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'entrega_coder_angular';
  isLoading: boolean = false;

  constructor(private loadingService: LoaderService) {
    this.loadingService.loadingTriggered.subscribe({
      next: (value) => {
        setTimeout(() => {
          this.isLoading = value;
        });
      }
    });
  }
}
