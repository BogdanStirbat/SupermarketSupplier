import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from './user';
import { AuthenticationService } from './authentication.service';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient, 
    private authenticationService: AuthenticationService) {

    }

  login(username: string, password: string) {
    console.log('Start HTT request');

    const params = new HttpParams()
                       .set('username', username)
                       .set('password', password)
                       .set('grant_type', 'password');

    const headers = new HttpHeaders()
                       .append('Authorization', 'Basic c3VwZXJtYXJrZXRzdXBwbGllcjptMiN1XW5UMjNRcUZkelBt')
                       .append('Content-Type', 'application/x-www-form-urlencoded')

    this.http.post(
      `${environment.apiUrl}/oauth/token`,
      params,
      {headers: headers}
    ).subscribe({
      next: resp => {
        let accessToken = resp['access_token'];

        const headers = new HttpHeaders()
                           .append('Content-Type', 'application/json')
                           .append('Accept', 'application/json')
                           .append('Authorization', 'Bearer ' + accessToken);

        this.http.get(
          `${environment.apiUrl}/api/users/current-user`,
          {headers: headers}
        ).subscribe({
          next: resp => {
            let id = resp['id'];
            let username = resp['username'];
            let role = resp['role'];

            let user = new User(id, username, role);
            this.authenticationService.login(user, accessToken);
          },
          error: error => {
            console.log('Error.');
            console.log(error);
          }
        });
      },
      error: error => {
        console.log('Error.');
        console.log(error);
      }
    });

    console.log('Finished HTT request');
  }
}
