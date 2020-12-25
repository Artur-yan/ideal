
import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';
import { ITransformParams } from '@platform/modules/http/interfaces/transform-params.interface';
import { PagingResponse } from './paging-response';
import { Default } from '@platform/decorators/default.decorator';

export class Request extends BaseModel {
	
	@Fillable()
	success: boolean;
	
	@Fillable()
	data: any;
	
	@Fillable()
	message: string;

	constructor(data: any, params?: ITransformParams) {
		super(data);
		
		if (params) {
			if (!params.pagination) {
				if (!Array.isArray(data.data)) {
					this.data = params.model.transform(data.data);
				} else {
					this.data = params.model.transformCollection(data.data);
				}
			} else {
				this.data = new PagingResponse(data.data, params.model, params.pagingExtraModel);
			}
		}
	}
}
