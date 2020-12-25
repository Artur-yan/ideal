import { BaseModel } from '@platform/modules/http/classes/base.model';
import { IBaseModelOptions } from '@platform/modules/http/interfaces/base-model-options.interface';

export function Fillable<T extends BaseModel>(key?: string) {
	return function(target: T, propertyKey: string) {
		(target.constructor as typeof BaseModel).requiredKeys.push(propertyKey);
		if (!(<any>target).options) {
			(<any>target).options = [];
		}
		const existItem: IBaseModelOptions = (<any>target).options.find(x => x.propertyKey === propertyKey);

		const obj = {
			key: key || propertyKey,
			propertyKey,
		};

		if (!existItem) {
			(<any>target).options.push(obj);
		} else {
			existItem.key = obj.key;
			existItem.propertyKey = obj.propertyKey;
		}
	};
}
