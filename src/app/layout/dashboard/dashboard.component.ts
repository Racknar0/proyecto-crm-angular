import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../interfaces/user.interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  userLogged: User | undefined;

  constructor(private authService: AuthService) {
  this.authService.setUserLoggedByToken().subscribe({
      next: (user) => {
        this.userLogged = user[0];
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}
