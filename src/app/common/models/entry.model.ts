import {BaseModel} from './base.model';
import {AdditionalFeeOption} from "./additional-fee-option.model";

export class Entry extends BaseModel {
  ContractId: string;
  Description: string;
  Hours: number;
  EndDateDisplay: Date;
  StartDateDisplay: Date | string;
  UserId: string;
  SubContractId: string;
  AdditionalFeeId: string | AdditionalFeeOption;
}
