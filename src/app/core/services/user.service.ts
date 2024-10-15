import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable, Subject} from 'rxjs';
import {CreateUserRequest, PaginatedUserList, RoleUpdateRequest, User, UserSearchRequest} from '../models/user';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userRoleUpdated$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  public getAllUsers(searchRequest: UserSearchRequest): Observable<PaginatedUserList> {
    return this.http.post<PaginatedUserList>(`${environment.ecoedenSearchApiUrl}/user-search-index`, searchRequest, {
      headers: this.getHttpHeaders(environment.searchApiSubscriptionKey)
    });
  }

  public userNameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.ecoedenUserApiUrl}/exists/${username}`, {
      headers: this.getHttpHeaders(environment.userApiSubscriptionKey)
    });
  }

  public getUserDetails(id: string): Observable<User> {
    return this.http.get<User>(`${environment.ecoedenUserApiUrl}/${id}`, {
      headers: this.getHttpHeaders(environment.userApiSubscriptionKey)
    });
  }

  public getUserCount(searchRequest?: UserSearchRequest): Observable<number> {
    const query = searchRequest ?? null;
    return this.http.post<number>(`${environment.ecoedenSearchApiUrl}/user-search-index/count`, query, {
      headers: this.getHttpHeaders(environment.searchApiSubscriptionKey)
    });
  }

  public createUser(request: CreateUserRequest): Observable<{[id: string]: string}> {
    return this.http.post<{[id: string]: string}>(`${environment.ecoedenUserApiUrl}`, request, {
      headers: this.getHttpHeaders(environment.userApiSubscriptionKey)
    });
  }

  public enableUser(id: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.ecoedenUserApiUrl}/enable/${id}`, null, {
      headers: this.getHttpHeaders(environment.userApiSubscriptionKey)
    });
  }

  public updateRole(request: RoleUpdateRequest): Observable<boolean> {
    return this.http
      .put<boolean>(`${environment.ecoedenUserApiUrl}/role/update`, request, {
        headers: this.getHttpHeaders(environment.userApiSubscriptionKey)
      })
      .pipe(
        map(response => {
          this.userRoleUpdated$.next(response);
          return response;
        })
      );
  }

  private getHttpHeaders(subscriptionkey: string) {
    return {
      'api-version': 'v2',
      'ocp-apim-subscriptionkey': subscriptionkey
    };
  }
}
