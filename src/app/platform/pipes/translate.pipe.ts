import { Pipe, PipeTransform } from '@angular/core';
import { LanguageStorage } from '@storage/language.storage';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {

  constructor(
    private languageStorage: LanguageStorage,
  ) {}

  transform(value: string, ...data: any[]): string {
    let translation: string = this.languageStorage.translations[value];
    for (let i = 0; i < data.length; i++)
      translation = translation.split(`{${i}}`).join(data[i]);
    return translation;
  }

}
