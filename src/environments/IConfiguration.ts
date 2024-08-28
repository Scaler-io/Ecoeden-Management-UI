export interface IConfiguration {
  production: boolean;
  oidcConfig: OidcConfig;
  ecoedenUserApiUrl: string;
  ecoedenCatalogueApiUrl: string;
  ecoedenSearchApiUrl: string;
  searchApiSubscriptionKey: string;
  userApiSubscriptionKey: string;
  catalogueApiSubscriptionKey: string;
}

interface OidcConfig {
  authority: string;
  redirectUrl: string;
  postLogoutRedirectUri: string;
  clientId: string;
  clientSecret?: string;
  scope: string;
  responseType: string;
  silentRenew: boolean;
  useRefreshToken: boolean;
  logLevel: number;
}
