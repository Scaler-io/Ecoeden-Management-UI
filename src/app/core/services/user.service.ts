import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PaginatedUserList, User, UserSearchRequest} from '../models/user';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getAllUsers(searchRequest: UserSearchRequest): Observable<PaginatedUserList> {
    return this.http.post<PaginatedUserList>(`${environment.ecoedenSearchApiUrl}/user-search-index`, searchRequest, {
      headers: this.getHttpHeaders(environment.searchApiSubscriptionKey)
    });
  }

  public getUserDetails(id: string): Observable<User> {
    return this.http.get<User>(`${environment.ecoedenUserApiUrl}/${id}`, {
      headers: this.getHttpHeaders(environment.userApiSubscriptionKey)
    });
  }

  private getHttpHeaders(subscriptionkey: string) {
    return {
      'api-version': 'v2',
      'ocp-apim-subscriptionkey': subscriptionkey
    };
  }
}
