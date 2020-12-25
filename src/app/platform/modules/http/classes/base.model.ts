import { IBaseModelOptions } from '../interfaces/base-model-options.interface';

export class BaseModel {
	static readonly requiredKeys: string[] = [];
	public _exist: boolean = true;

	private options: IBaseModelOptions[];

	constructor(data: any) {
		this.dataHandler(data);
	}

	public static createNullObject<T extends BaseModel>(): T {
		const newObj = <T>(new this({}));
		newObj._exist = false;
		this.requiredKeys.forEach(key => {
			if (newObj.hasOwnProperty(key) && !newObj[key]) {
				newObj[key] = null;
			}
		});
		return newObj;
	}

	public static transform<T extends BaseModel>(data: any): T {
		if (!data) {
			return this.createNullObject();
		}

		return <T>(new this(data));
	}

	public static transformCollection<T extends BaseModel>(data: Array<any>): Array<T> {
		const transformedData = [];
		for (const item of (data || [])) {
			transformedData.push(this.transform(item));
		}

		return <T[]>transformedData;
	}

	protected getLocalDate(date: string): string {
    if (date && !date.includes('Z')) {
      return date + 'Z';
    }
    return date;
  }

	private dataHandler(data: any) {
		this.options.forEach(x => {
			let val = data[x.key];

			if ((x.default || x.default === 0 || x.default === '') && !val) {
				val = x.default;
			}

			if (!x.model || !x.transform) {
				this[x.propertyKey] = val;
			} else if (x.model) {
				if (x.transform === 'model') {
					this[x.propertyKey] = x.model.transform(val);
				} else {
					this[x.propertyKey] = x.model.transformCollection(val);
				}
			}
		});
	}
}
