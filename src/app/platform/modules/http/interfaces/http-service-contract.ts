import { IOptions } from './options.interface';
import { HttpService } from '../services/http.service';

export interface IHttpServiceContract {
  http: HttpService;
  httpOptions: IOptions;
  controller: string;
}
