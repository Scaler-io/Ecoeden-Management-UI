import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {BaseService} from './base-service';
import {Customer, CustomerSearchRequest, PaginatedCustomerList, UpsertCustomerRequest} from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getAllCustomers(searchRequest: CustomerSearchRequest): Observable<PaginatedCustomerList> {
    return this.http.post<PaginatedCustomerList>(`${environment.ecoedenSearchApiUrl}/customer-search-index`, searchRequest, {
      headers: this.getHttpHeaders(environment.searchApiSubscriptionKey, 'v2')
    });
  }

  public getCustomerCount(searchRequest?: CustomerSearchRequest): Observable<number> {
    return this.http.post<number>(`${environment.ecoedenSearchApiUrl}/customer-search-index/count`, searchRequest, {
      headers: this.getHttpHeaders(environment.searchApiSubscriptionKey, 'v2')
    });
  }

  public getCustomerDetails(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${environment.ecoedenInventoryApiUrl}/customer/${id}`, {
      headers: this.getHttpHeaders(environment.inventoryApiSubscriptionKey)
    });
  }

  public upsertCustomer(request: UpsertCustomerRequest): Observable<Customer> {
    return this.http.post<Customer>(`${environment.ecoedenInventoryApiUrl}/customer`, request, {
      headers: this.getHttpHeaders(environment.inventoryApiSubscriptionKey)
    });
  }

  public deletecustomer(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.ecoedenInventoryApiUrl}/customer/${id}`, {
      headers: this.getHttpHeaders(environment.inventoryApiSubscriptionKey)
    });
  }
}
