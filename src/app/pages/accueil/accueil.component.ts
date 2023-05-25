import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})

export class AccueilComponent{

  listeArticle: any = [];
  constructor(
    private http: HttpClient, 
    public auth: AuthentificationService
    ){
    this.raffraichirListeArticle();
  }
  raffraichirListeArticle(){
    this.http
    .get("http://localhost/Alonso/backend-angular/liste-articles.php")
    .subscribe({
        next : (articles) => this.listeArticle = articles,
        error : (erreur)=> alert("Erreur interne, contacter l'administrador")
      });
  }
  onSuppressionArticle(idArticle: number) {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const enTete = { Authorization: jwt };

      this.http
        .delete(
          'http://localhost/Alonso/backend-angular/suppression-article.php?id=' +
            idArticle,
          { headers: enTete }
        )
        .subscribe((reponse) => this.raffraichirListeArticle());
    }
  }
}