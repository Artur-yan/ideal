
import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class PagingResponse<T extends BaseModel = BaseModel, U = any> extends BaseModel {
	
	@Fillable()
	data: T[];
	
	@Fillable()
	itemCount: number;
	
	@Fillable()
	pageCount: number;

	@Fillable()
	extraData: U;

	constructor(data: any, model: typeof BaseModel, extraModel?: typeof BaseModel) {
		super(data);
		this.data = model.transformCollection(data.data);

		if (extraModel) {
			if (!Array.isArray(data.extraData)) {
				this.extraData = extraModel.transform(data.extraData) as any;
			} else {
				this.extraData = extraModel.transformCollection(data.extraData) as any;
			}
		}
	}
}
