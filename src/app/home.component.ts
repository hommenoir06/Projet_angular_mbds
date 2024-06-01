import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  titre = 'Bienvenue à la page d\'accueil';
  currentUser: string | null;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }
}
