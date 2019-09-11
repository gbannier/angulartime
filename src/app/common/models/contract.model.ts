import {BaseModel} from './base.model';

export class Contract extends BaseModel {
  CustomerName: string;
  Description: string;
  EndDateDisplay: Date;
  StartDateDisplay: Date;
}
