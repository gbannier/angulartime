import {BaseModel} from './base.model';
import {AdditionalFeeOption} from "./additional-fee-option.model";

export interface Entry extends BaseModel {
  ContractId: string;
  Description: string;
  Hours: number;
  EndDateDisplay: Date;
  StartDateDisplay: Date;
  UserId: string;
  SubContractId: string;
  AdditionalFeeId: string | AdditionalFeeOption;
}
