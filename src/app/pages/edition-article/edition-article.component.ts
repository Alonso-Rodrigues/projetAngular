import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { __values } from 'tslib';


@Component({
  selector: 'app-edition-article',
  templateUrl: './edition-article.component.html',
  styleUrls: ['./edition-article.component.scss']
})
export class EditionArticleComponent {

  titre: string = "eDitIon UtilisateuR";
  aujourdhui: Date = new Date();
  idArticle: number | null = null;

  constructor(
    private formBuilder : FormBuilder, 
    private http : HttpClient, 
    private router : Router, 
    private route : ActivatedRoute
    ) {
      this.route.params.subscribe((parametres: any) => {
        if(parametres.id != null){
          this.idArticle = parametres.id;
          this.http
            .get('http://localhost/Alonso/backend-angular/article.php?id=' + 
              parametres.id
          )
          .subscribe(article => this.formulaire.patchValue(article));
        }
      }
    )
  }
  
  formulaire: FormGroup = this.formBuilder.group({
    nom: ['',[Validators.required, Validators.maxLength(20)]],
    description: ["",[Validators.required, Validators.minLength(10)]]
  });

  onAjoutArticle() {
    if(this.formulaire.valid) {
      const nouvelArticle = this.formulaire.value;
      nouvelArticle.id = this.idArticle;

      const jwt = localStorage.getItem("jwt");
      if(jwt) {

        this.http
          .post(
          'http://localhost/Alonso/backend-angular/' +
          (this.idArticle == null ? 'ajout-article' : 'modifier-article') +
          '.php',
          nouvelArticle,
          {headers: {Authorization: jwt}}
        )
      .subscribe((resultat) => this.router.navigateByUrl('/accueil'));
      }     
    }
  }
}

