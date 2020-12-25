import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CurrencyEnum } from '@platform/enums/currency.enum';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {

  constructor(
    private currencyPipe: CurrencyPipe,
  ) { }

  transform(value: number, currency = CurrencyEnum.AMD, hideCurrency = false): string | null {
    let isInt = true;
    if (value < 0) {
      isInt = false;
      value *= -1;
    }
    let data = this.currencyPipe.transform(value || 0);
    data = (data.slice(1, data.length - 3) + (hideCurrency ? '' : (' ' + CurrencyEnum[currency]))).replace(new RegExp(',', 'g'), '.');
    if (!isInt) {
      data = '-' + data;
    }
    return data;
  }
}
