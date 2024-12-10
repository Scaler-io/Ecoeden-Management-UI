import {LogLevel} from 'angular-auth-oidc-client';
import {IConfiguration} from './IConfiguration';

export const environment: IConfiguration = {
  production: true,
  ecoedenUserApiUrl: 'http://localhost:8000/catalogue',
  ecoedenCatalogueApiUrl: 'http://localhost:8000/user',
  ecoedenSearchApiUrl: 'http://localhost:8000/search',
  searchApiSubscriptionKey: '79AE4A5B04CC48B887E38FAE7D1282C0',
  catalogueApiSubscriptionKey: 'F340FE8EA8604456AC4E66F31A87574C',
  userApiSubscriptionKey: '7B6AD94DCC3C4E9F891C52C8C340D99E',
  oidcConfig: {
    authority: 'http://localhost:5000',
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: 'ecoeden.management.ui',
    logLevel: LogLevel.Error,
    responseType: 'code',
    scope: 'openid profile email catalogueapi:read catalogueapi:write userapi:read userapi:write',
    silentRenew: false,
    useRefreshToken: false
  }
};
