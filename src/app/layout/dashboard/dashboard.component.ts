import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
  }
}
