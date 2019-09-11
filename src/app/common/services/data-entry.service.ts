import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../models/user.model';
import {Contract} from '../models/contract.model';
import {Observable, throwError} from 'rxjs';
import {catchError, delay, timeout} from 'rxjs/operators';
import {Project} from '../models/project.model';
import {Entry} from '../models/entry.model';
import {AdditionalFeeOption} from '../models/additional-fee-option.model';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {BaseDataService} from './base-data-service'
@Injectable({
  providedIn: 'root',
})

export class DataEntryService extends BaseDataService{

  contractsUrl = 'assets/contracts-data.json';
  projectsUrl = 'assets/projects-data.json';
  entriesUrl = 'assets/entries-data.json';
  additionalFeeOptionsUrl = 'assets/additionalfee-options.json';
  additionalFeeOptions: AdditionalFeeOption[];
  dataItem: Entry;
  constructor(protected http: HttpClient) {
    super(http);
  }

  static formatDate(date: Date): NgbDateStruct {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDay()
    };
  }

  getOptionValue(optionId: string): AdditionalFeeOption{
    return this.additionalFeeOptions.find((option)=> option.id===optionId);
  }


  getAdditionalFeeOptions() {
    return this.http.get<AdditionalFeeOption[]>(this.additionalFeeOptionsUrl).pipe(
        catchError(BaseDataService.handleError),
        delay(300)
    );
  }

  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.contractsUrl).pipe(
      catchError(DataEntryService.handleError),
      delay(2000)
    );
  }

  getProjectsByContractId(contracttId: string) {
    return this.http.get<Project[]>(this.projectsUrl).pipe( // pass the id someday
      catchError(DataEntryService.handleError),
      delay(1000)
    );
  }

  getEntriesByProjectId(projectId: string) {
    return this.http.get<Entry[]>(this.entriesUrl).pipe( // pass the id someday
      catchError(DataEntryService.handleError),
      delay(1000)
    );
  }

  saveData(){

    console.log(this.form)
  }
}
