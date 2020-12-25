import { PagingRequest } from '@models/paging-request';
import { UsedCountRM } from '@api/promo-code/req/used-count-req.model';

export class GetPromoCodesReqModel extends PagingRequest {

  fromData: Date;
  sortingDirectionValue: number;
  sortingParameterValue: number;
  text: string;
  toDate: number;
  typeList: number[] = [];
  usedCount = new UsedCountRM();
  userCount = new UsedCountRM();
  maxPrice = new UsedCountRM();
  minPrice = new UsedCountRM();

  getModel() {
    return {
      page: this.page,
      count: this.count,
      fromData: this.fromData.getTime(),
      sortingDirectionValue: this.sortingDirectionValue,
      sortingParameterValue: this.sortingParameterValue,
      text: this.text,
      toDate: this.toDate,
      typeList: this.typeList,
      usedCount: this.usedCount.getModel(),
      userCount: this.userCount.getModel(),
      maxPrice: this.maxPrice.getModel(),
      minPrice: this.minPrice.getModel(),
    };
  }

}
