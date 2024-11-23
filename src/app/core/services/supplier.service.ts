import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UpsertSupplierRequest, PaginatedSupplierList, Supplier, SupplierSearchRequest} from '../models/supplier';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  public getAllSuppliers(searchRequest: SupplierSearchRequest): Observable<PaginatedSupplierList> {
    return this.http.post<PaginatedSupplierList>(`${environment.ecoedenSearchApiUrl}/supplier-search-index`, searchRequest, {
      headers: this.getHttpHeaders(environment.searchApiSubscriptionKey, 'v2')
    });
  }

  public getSupplierDetails(id: string): Observable<Supplier> {
    return this.http.get<Supplier>(`${environment.ecoedenInventoryApiUrl}/supplier/${id}`, {
      headers: this.getHttpHeaders(environment.inventoryApiSubscriptionKey)
    });
  }

  public getSupplierCount(searchRequest?: SupplierSearchRequest): Observable<number> {
    return this.http.post<number>(`${environment.ecoedenSearchApiUrl}/supplier-search-index/count`, searchRequest, {
      headers: this.getHttpHeaders(environment.searchApiSubscriptionKey, 'v2')
    });
  }

  public upsertSupplier(request: UpsertSupplierRequest): Observable<Supplier> {
    return this.http.post<Supplier>(`${environment.ecoedenInventoryApiUrl}/supplier`, request, {
      headers: this.getHttpHeaders(environment.inventoryApiSubscriptionKey)
    });
  }

  public deleteSupplier(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.ecoedenInventoryApiUrl}/supplier/${id}`, {
      headers: this.getHttpHeaders(environment.inventoryApiSubscriptionKey)
    });
  }

  private getHttpHeaders(subscriptionkey: string, apiversion = 'v1') {
    return {
      'api-version': apiversion,
      'ocp-apim-subscriptionkey': subscriptionkey
    };
  }
}
