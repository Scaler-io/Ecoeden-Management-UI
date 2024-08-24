import { Injectable } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oidc: OidcSecurityService) {}

  public getToken(): string {
    return this.oidc.getAccessToken();
  }
  public authorize(): void {
    this.oidc.authorize();
  }
  public isAuthenticated(): Observable<LoginResponse> {
    return this.oidc.checkAuth();
  }
  public signoff(): void {
    this.oidc.logoff();
  }
}
