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

@Injectable({
  providedIn: 'root',
})

export class DataService {
  userId;  // userId seems not to needed?
  contractsUrl = 'assets/contracts-data.json';
  projectsUrl = 'assets/projects-data.json';
  entriesUrl = 'assets/entries-data.json';
  additionalFeeOptionsUrl = 'assets/additionalfee-options.json';
  additionalFeeOptions: AdditionalFeeOption[];

  constructor(private http: HttpClient) {
    this.http.get('assets/user.json').subscribe((user: User) => {
        this.userId = user.id;
      }
    );
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
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
        catchError(DataService.handleError),
        delay(300)
    );
  }

  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.contractsUrl).pipe(
      catchError(DataService.handleError),
      delay(2000)
    );
  }

  getProjectsByContractId(contracttId: string) {
    return this.http.get<Project[]>(this.projectsUrl).pipe( // pass the id someday
      catchError(DataService.handleError),
      delay(1000)
    );
  }

  getEntriesByProjectId(projectId: string) {
    return this.http.get<Entry[]>(this.entriesUrl).pipe( // pass the id someday
      catchError(DataService.handleError),
      delay(1000)
    );
  }
}
