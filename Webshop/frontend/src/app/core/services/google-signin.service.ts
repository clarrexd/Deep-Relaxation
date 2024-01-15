import { Injectable } from '@angular/core';
import * as loadScript from 'load-script';

// declare const gapi: any;
// let gapi = require('gapi');

@Injectable({
  providedIn: 'root',
})
export class GoogleSigninService {
  constructor() {}

  private auth2: any;

  initGoogleSignIn(): Promise<void> {
    return new Promise((resolve, reject) => {
      gapi.load('auth2', () => {
        gapi.auth2
          .init({
            client_id:
              '1056239443682-ohm81qmjcte88unluf6e8u5ehb3pbdv3.apps.googleusercontent.com',
          })
          .then((auth2: any) => {
            this.auth2 = auth2;
            resolve();
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    });
  }

  signIn(): Promise<any> {
    return this.auth2.signIn();
  }

  signOut(): Promise<void> {
    return this.auth2.signOut();
  }
}
