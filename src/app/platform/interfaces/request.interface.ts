
export interface IResponse<T = any> {
	success: boolean;
	
	data: T;
	
	messages: { value: string }[];
}
