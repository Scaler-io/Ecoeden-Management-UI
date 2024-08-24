// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { LogLevel } from 'angular-auth-oidc-client';
import { IConfiguration } from './IConfiguration';

export const environment: IConfiguration = {
  production: false,
  oidcConfig: {
    authority: 'http://localhost:5000',
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: 'ecoeden.management.ui',
    logLevel: LogLevel.Error,
    responseType: 'code',
    scope:
      'openid profile email catalogueapi:read catalogueapi:write userapi:read userapi:write',
    silentRenew: false,
    useRefreshToken: false,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
