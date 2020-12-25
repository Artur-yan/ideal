import { Injectable } from '@angular/core';
import { ApiService } from '@platform/modules/http/classes/base.service';
import { Observable } from 'rxjs';
import { AddressRM } from '@api/address/req/address-req.model';
import { AddressModel } from '@api/address/res/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService extends ApiService {

  readonly controller = 'address';

  public create(data: AddressRM): Observable<any> {
    return this.httpClient.post('', { model: null }, data.getModel());
  }

  public getDetails(id: string): Observable<AddressModel> {
    return this.httpClient.get(id, { model: AddressModel });
  }

  public edit(id: string, data: AddressRM): Observable<any> {
    return this.httpClient.put(id, { model: null }, data.getModel());
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete(id, { model: null });
  }

  public getAll(): Observable<AddressModel[]> {
    return this.httpClient.get('getAddressList', { model: AddressModel });
  }
}
