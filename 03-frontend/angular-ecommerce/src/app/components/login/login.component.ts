import { Component, OnInit } from '@angular/core';
import * as OktaSignIn from '@okta/okta-signin-widget';
import myAppConfig from 'src/app/config/my-app-config';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuthStateService, private oktaAuth: OktaAuth) {

      this.oktaSignin = new OktaSignIn({
        logo: 'assets/images/logo.png', 
        baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
        clientId: myAppConfig.oidc.clientId,
        redirectUri: myAppConfig.oidc.redirectUri,
        authParams: {
          //proof key for code exchange
          pkce: true,
          issuer: myAppConfig.oidc.issuer,
          scopes: myAppConfig.oidc.scopes
        }

      });
   }

  ngOnInit(): void {
    this.oktaSignin.remove();
    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'},  // this name should be same as div tag in login.component.html
      (response) => {
        if (response.status === 'SUCCESS'){
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error) => {
        throw error;
      }
    )
  }

}
