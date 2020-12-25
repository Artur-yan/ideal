import { BaseModel } from '@platform/modules/http/classes/base.model';

export function IsArray<T extends BaseModel>() {
	return function(target: T, propertyKey: string) {
		if (!(<any>target).options) {
			(<any>target).options = [];
		}

		const existItem = (<any>target).options.find(x => x.propertyKey === propertyKey);

		if (!existItem) {
			(<any>target).options.push({
				key: propertyKey,
				propertyKey,
				transform: 'array',
			});
		} else {
			existItem.transform = 'array';
		}
	};
}
