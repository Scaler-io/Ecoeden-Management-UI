import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable, Subject} from 'rxjs';
import {CreateUserRequest, PaginatedUserList, RoleUpdateRequest, User, UserSearchRequest} from '../models/user';
import {environment} from 'src/environments/environment';
import {BaseService} from './base-service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  public userRoleUpdated$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
    super();
  }

  public getAllUsers(searchRequest: UserSearchRequest): Observable<PaginatedUserList> {
    return this.http.post<PaginatedUserList>(`${environment.ecoedenSearchApiUrl}/user-search-index`, searchRequest, {
      headers: this.getHttpHeaders(environment.searchApiSubscriptionKey, 'v2')
    });
  }

  public userNameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.ecoedenUserApiUrl}/exists/${username}`, {
      headers: this.getHttpHeaders(environment.userApiSubscriptionKey, 'v2')
    });
  }

  public getUserDetails(id: string): Observable<User> {
    return this.http.get<User>(`${environment.ecoedenUserApiUrl}/${id}`, {
      headers: this.getHttpHeaders(environment.userApiSubscriptionKey, 'v2')
    });
  }

  public getUserCount(searchRequest?: UserSearchRequest): Observable<number> {
    const query = searchRequest ?? null;
    return this.http.post<number>(`${environment.ecoedenSearchApiUrl}/user-search-index/count`, query, {
      headers: this.getHttpHeaders(environment.searchApiSubscriptionKey, 'v2')
    });
  }

  public createUser(request: CreateUserRequest): Observable<{[id: string]: string}> {
    return this.http.post<{[id: string]: string}>(`${environment.ecoedenUserApiUrl}`, request, {
      headers: this.getHttpHeaders(environment.userApiSubscriptionKey, 'v2')
    });
  }

  public enableUser(id: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.ecoedenUserApiUrl}/enable/${id}`, null, {
      headers: this.getHttpHeaders(environment.userApiSubscriptionKey, 'v2')
    });
  }

  public updateRole(request: RoleUpdateRequest): Observable<boolean> {
    return this.http
      .put<boolean>(`${environment.ecoedenUserApiUrl}/role/update`, request, {
        headers: this.getHttpHeaders(environment.userApiSubscriptionKey, 'v2')
      })
      .pipe(
        map(response => {
          this.userRoleUpdated$.next(response);
          return response;
        })
      );
  }
}
