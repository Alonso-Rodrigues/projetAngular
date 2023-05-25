import { Component } from '@angular/core';
import { AuthentificationService } from './services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public auth: AuthentificationService,
    public router: Router
    ) {}

  onDeconnexion(){
    localStorage.removeItem('jwt');
    this.auth.utilisateur = null;
    this.router.navigateByUrl('/accueil');
    }
}

