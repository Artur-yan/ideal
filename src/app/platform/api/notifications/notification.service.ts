import { Injectable } from '@angular/core';
import { ApiService } from '@platform/modules/http/classes/base.service';
import { Observable } from 'rxjs';
import { Notification } from '@models/notification';
import { PagingRequest } from '@models/paging-request';
import { PagingResponse } from '@models/paging-response';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends ApiService {

  readonly controller = 'notification';

  public getAll(data: PagingRequest): Observable<PagingResponse<Notification>> {
    return this.httpClient.get(`getParticipantNotifications${data.getPath()}`, { model: Notification, pagination: true });
  }

  public getUnseen(): Observable<any> {
    return this.httpClient.get(`getUnseenNotificationsCount`, { model: Notification });
  }
}
