import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../../../environments/environment';
import { AuthModel } from '../../models/auth.model';
import { UserRegistrationModel,User, LoginRequest, ApiClientService, NotificationService } from 'src/app/shared';


const API_USERS_URL = `${environment._apiEndpoint}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  constructor(private http: HttpClient) {}

  // public methods
  //login(email: string, password: string): Observable<any> {
  login(loginRequest:LoginRequest): Observable<any> {
    return this.http.post<any>(`${API_USERS_URL}/login`, loginRequest);
  }

  // CREATE =>  POST: add a new user to the server
  //createUser(user: UserModel): Observable<any> {
  createUser(user: UserRegistrationModel): Observable<any> {
    return this.http.post<any>(`${API_USERS_URL}/register`, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string): Observable<User | undefined> {
    const lsValue = localStorage.getItem(this.authLocalStorageToken);

      const authData = JSON.parse(lsValue || '{}');
      if(authData.authToken != token){
        return of(undefined);
      }
      return of(authData.userData);
    /* const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<User>(`${API_USERS_URL}/me`, {
      headers: httpHeaders,
    }); */
  }
}
