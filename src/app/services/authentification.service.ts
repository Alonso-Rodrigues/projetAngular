import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  utilisateur: any = null;
  constructor() { 

    const jwt = localStorage.getItem('jwt');

    if(jwt != null) {
      this.connexion(jwt);
    }
  }
  connexion(jwt: string){
    localStorage.setItem('jwt', jwt);
    const partiesJwt = jwt.split('.'); // on découope le jwt en 3 parties
    const payloadBase64 = partiesJwt[1]; // on récupère la partie payload en base 64
    const jsonPayload = window.atob(payloadBase64);// on recupere le json  
    const utilisateurJwt = JSON.parse(jsonPayload); // on transforme le json en objet JS
    this.utilisateur = utilisateurJwt; // on affecte l'utilisateur à la propriété utilisateur


   // this.utilisateur = JSON.parse(window.atob(jwt.split('.')[1]));
  }
}

