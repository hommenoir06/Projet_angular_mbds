import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titre = "Application de gestion des devoirs à rendre !";
  showSidebar: boolean = true;
  sidenav: any;

  constructor(
    private authService: AuthService,
    private assignmentsService: AssignmentsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.subscribe(() => {
      this.showSidebar = this.router.url !== '/login';
    });
  }

  ngOnInit(): void {}

  onLogin() {
    console.log("On va simuler un login...");
    this.authService.isAdmin().then(admin => {
      if (!admin) {
        // Si l'utilisateur n'est pas un admin, nous pouvons appeler la méthode logIn
        const username = 'admin'; // Remplacez ceci par le nom d'utilisateur saisi par l'utilisateur
        const password = 'admin'; // Remplacez ceci par le mot de passe saisi par l'utilisateur
        if(this.authService.logIn(username, password)) {
          // Connexion réussie
          console.log("Connexion réussie");
        } else {
          // Identifiants incorrects
          console.log("Identifiants incorrects");
        }
      } else {
        // Si l'utilisateur est un admin, nous le déconnectons
        this.authService.logOut();
        // et on navigue vers la page d'accueil
        this.router.navigate(['/home']);
      }
    });
  }

  genereDonnesDeTest() {
    this.assignmentsService.peuplerBDavecForkJoin().subscribe(() => {
      console.log("PEUPLER BD A BIEN TERMINE LES AJOUTS !");
      window.location.reload();
    });
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
