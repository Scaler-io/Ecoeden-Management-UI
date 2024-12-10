import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseService} from './base-service';
import {environment} from 'src/environments/environment';
import {AddressSuggestion} from '../models/address-suggestion';

@Injectable({
  providedIn: 'root'
})
export class PostcodeValidationService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getAddressSuggestion(postcode: string): Observable<AddressSuggestion> {
    return this.http.get<AddressSuggestion>(`${environment.ecoedenBffApiUrl}/postcode/${postcode}`, {
      headers: this.getHttpHeaders(environment.bffApiSubscriptionKey)
    });
  }
}
