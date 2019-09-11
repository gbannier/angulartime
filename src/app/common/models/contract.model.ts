import {BaseModel} from './base.model';

export interface Contract extends BaseModel {
  CustomerName: string;
  Description: string;
  EndDateDisplay: Date;
  StartDateDisplay: Date;
}
