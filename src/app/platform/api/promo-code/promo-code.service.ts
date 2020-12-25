import { Injectable } from '@angular/core';
import { ApiService } from '@platform/modules/http/classes/base.service';
import { Observable } from 'rxjs';
import { GetPromoCodesReqModel } from '@api/promo-code/req/get-promo-codes-req.model';

@Injectable({
  providedIn: 'root',
})
export class PromoCodeService extends ApiService {

  readonly controller = 'promoCode';

  public getAll(data: GetPromoCodesReqModel): Observable<any> {
    return this.httpClient.post(`getAllPromoCodes${data.getPath()}`, { model: null }, data.getModel());
  }

}
