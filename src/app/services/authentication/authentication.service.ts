import { Injectable } from '@angular/core';
import { AppSettings } from '../../settings/app.settings';
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private host: string = AppSettings.APP_URL;
  declare private token: string;
  declare private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) { }
  // le petit user c'est l'objet et le grand User c'est le modèle
  //methode permettant à un utilisateur de se connecter
  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>
      (`${this.host}api/auth/signin`, user, {observe:'response'});
  }
  //methode permettant à un utilisateur de s'inscrire
  public register(user: User): Observable<User>{
    return this.http.post<User>
      (`${this.host}api/auth/signup`, user);
  }

  //methode qui permet la déconnexion, elle vide le token et le local storage à la déconnexion
  public logOut(): void {
    this.token = '';
    this.loggedInUsername = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }
  // methode permettant de sauvegarder nitre token le temps de la session
  public saveToken(token: string): void{
    this.token = token;
    localStorage.setItem('token', token);
  }
  // ajout de mon utilisateur au cache local
  public addUserToLocalCache(user: User): void{
    localStorage.setItem('user', JSON.stringify(user));
  }
  //méthode qui récupère l'utilisateur depuis le cache local
  public getUserFromLocalCache(): User {
    // (!) || ' ' = null  ou string vide
    return JSON.parse(localStorage.getItem('user')!);
  }
  //methode qui charge le token à partir du local storage
  public loadToken():void {
    this.token = localStorage.getItem('token') || ' ';
  }
  //methode qui permet de récupérer le token à partir du local storage
  public getToken():string {
    return this.token;
  }
  // methode qui vérifie si l'utilisateur est bien connecter via le token
  public isLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== ' ') {
      // vérifie que la sous chaîne de notre token n'est pas null
      if (!this.jwtHelper.decodeToken(this.token).sub != null || '') {
        //vérifie que le token n'as pas expiré
        if (this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
     }
    } else {
      this.logOut();
      return false;
    }
    return false;
  }
}
