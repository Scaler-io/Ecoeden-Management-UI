export interface IConfiguration {
  production: boolean;
  oidcConfig: OidcConfig;
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
