export interface IConfiguration {
  production: boolean;
  oidcConfig: OidcConfig;
  ecoedenUserApiUrl: string;
  ecoedenCatalogueApiUrl: string;
  ecoedenInventoryApiUrl: string;
  ecoedenSearchApiUrl: string;
  ecoedenBffApiUrl: string;
  searchApiSubscriptionKey: string;
  userApiSubscriptionKey: string;
  catalogueApiSubscriptionKey: string;
  inventoryApiSubscriptionKey: string;
  bffApiSubscriptionKey: string;
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
