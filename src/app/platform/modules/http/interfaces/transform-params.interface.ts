import { BaseModel } from '../classes/base.model';

export interface ITransformParams {
    model: typeof BaseModel;
    pagingExtraModel: typeof BaseModel;
    pagination: boolean;
}
