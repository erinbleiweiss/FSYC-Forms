import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import * as Cognito from 'amazon-cognito-identity-js';

declare const gapi: any;

@Injectable()
export class AuthService {

  constructor() { }

  public auth2: any;
  public googleInit(signInButton: any) {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: '616385063828-j8jcdh4shfdrhlj3sa3vftdlglkqc04l.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      that.attachSignin(signInButton);
    });
  }
  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {

        let auth_response = googleUser.getAuthResponse();
        console.log(auth_response);

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE

        // Add the Google access token to the Cognito credentials login map.
        AWS.config.region = 'us-west-2';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'us-west-2:e84d8eff-b790-4bd8-a650-8593d9923bf7',
          Logins: {
            'accounts.google.com': auth_response.id_token
          }
        });

        console.log(AWS.config.credentials);

        //// Obtain AWS credentials
        (<AWS.CognitoIdentityCredentials>AWS.config.credentials).get(function(){
          // Access AWS resources here.
        });

      }, function (error) {
        alert(JSON.stringify(error, undefined, 2));
      });
  }


}
