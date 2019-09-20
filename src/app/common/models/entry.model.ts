import {BaseModel} from './base.model';
import {AdditionalFeeOption} from "./additional-fee-option.model";

export class Entry extends BaseModel {
  ContractId: string;
  Description: string;
  Hours: number;
  EndDateDisplay: Date | string;
  StartDateDisplay: Date | string;
  UserId: string;
  SubContractId: string;
  // not the best approuch, alternativle we could add a temp property
  AdditionalFeeId: string | AdditionalFeeOption;
}
