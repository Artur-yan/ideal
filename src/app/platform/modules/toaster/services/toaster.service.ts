import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Toaster } from '../models/toaster.model';
import { ToasterEnum } from '../enums/toaster-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  public toaster: Subject<Toaster> = new Subject();

  constructor() { }

  public showNotification(text: string, status: ToasterEnum = ToasterEnum.Success): void {
    const toaster = new Toaster({
      status,
      text,
    });
    this.toaster.next(toaster);
  }
}
