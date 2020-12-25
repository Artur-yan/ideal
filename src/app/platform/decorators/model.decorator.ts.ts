import { BaseModel } from '@platform/modules/http/classes/base.model';

export function Model<T extends BaseModel>(model: typeof BaseModel) {
	return function(target: T, propertyKey: string) {
		if (!(<any>target).options) {
			(<any>target).options = [];
		}

		const existItem = (<any>target).options.find(x => x.propertyKey === propertyKey);

		if (!existItem) {
			(<any>target).options.push({
				key: propertyKey,
				propertyKey,
				model,
				transform: 'model',
			});
		} else {
			existItem.model = model;
			existItem.transform = existItem.transform || 'model';
		}
	};
}
