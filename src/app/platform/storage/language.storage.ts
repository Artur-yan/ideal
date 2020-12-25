import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageEnum } from '@enums/language.enum';
import { HttpOptionsService } from '@platform/modules/http/services/http-options.service';

import EN from '@assets/translations/en';
import RU from '@assets/translations/ru';
import HY from '@assets/translations/hy';

@Injectable({
  providedIn: 'root',
})
export class LanguageStorage {

  private readonly storageKey: string = 'language';
  private _translations = new BehaviorSubject<typeof HY>(HY);

  constructor(
    private httpOptionsService: HttpOptionsService,
  ) {
    this.setTranslations();
  }

  public get translations(): typeof HY {
    return this._translations.value;
  }

  public setLanguage(language: LanguageEnum) {
    this.saveLanguageInStorage(language);
    location.reload();
  }

  private saveLanguageInStorage(language: LanguageEnum) {
    localStorage.setItem(this.storageKey, language.toString());
  }

  public getLanguageFromStorage(): LanguageEnum {
    // return Number(localStorage.getItem(this.storageKey));
    return 10;
  }

  public setLanguageInHeader() {
    this.httpOptionsService.setLanguage(this.getLanguageFromStorage() || LanguageEnum.HY);
  }

  private setTranslations(): void {
    switch (this.getLanguageFromStorage()) {
      case LanguageEnum.EN:
        this._translations.next(EN);
        break;
      case LanguageEnum.RU:
        this._translations.next(RU);
        break;
      default:
        break;
    }
  }

}
