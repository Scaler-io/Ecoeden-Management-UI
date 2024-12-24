import {Injectable} from '@angular/core';
import {BaseService} from './base-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnitSearchRequest, PaginatedUnitList, Unit, UpsertUnitRequest } from '../models/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getAllUnits(searchRequest: UnitSearchRequest): Observable<PaginatedUnitList> {
    return this.http.post<PaginatedUnitList>(`${environment.ecoedenSearchApiUrl}/unit-search-index`, searchRequest, {
      headers: this.getHttpHeaders(environment.searchApiSubscriptionKey, 'v2')
    });
  }

  public getUnitCount(searchRequest?: UnitSearchRequest): Observable<number> {
    return this.http.post<number>(`${environment.ecoedenSearchApiUrl}/unit-search-index/count`, searchRequest, {
      headers: this.getHttpHeaders(environment.searchApiSubscriptionKey, 'v2')
    });
  }

  public getUnitDetails(id: string): Observable<Unit> {
    return this.http.get<Unit>(`${environment.ecoedenInventoryApiUrl}/unit/${id}`, {
      headers: this.getHttpHeaders(environment.inventoryApiSubscriptionKey)
    });
  }

  public upsertUnit(request: UpsertUnitRequest): Observable<Unit> {
    return this.http.post<Unit>(`${environment.ecoedenInventoryApiUrl}/unit`, request, {
      headers: this.getHttpHeaders(environment.inventoryApiSubscriptionKey)
    });
  }

  public deleteunit(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.ecoedenInventoryApiUrl}/unit/${id}`, {
      headers: this.getHttpHeaders(environment.inventoryApiSubscriptionKey)
    });
  }
}
