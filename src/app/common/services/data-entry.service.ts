import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contract} from '../models/contract.model';
import {Observable} from 'rxjs';
import {catchError, delay} from 'rxjs/operators';
import {Project} from '../models/project.model';
import {Entry} from '../models/entry.model';
import {AdditionalFeeOption} from '../models/additional-fee-option.model';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {BaseDataService} from './base-data-service'

@Injectable({
    providedIn: 'root',
})

export class DataEntryService extends BaseDataService {

    contractsUrl = 'assets/contracts-data.json';
    projectsUrl = 'assets/projects-data.json';
    entriesUrl = 'assets/entries-data.json';
    additionalFeeOptionsUrl = 'assets/additionalfee-options.json';
    additionalFeeOptions: AdditionalFeeOption[];
    dataItem: Entry;
    originalContractId: string;
    originalProjectId: string;

    constructor(protected http: HttpClient) {
        super(http);
    }
    // todo may copy to utilities; if you like do it with moments.js
    static formatDate(date: Date): NgbDateStruct {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
    }

    static reFormatDate(ngDate: NgbDateStruct): string {
        let date = new Date(ngDate.year, ngDate.month - 1, ngDate.day);
        return date.toISOString();
    }

    getOptionValue(optionId: string): AdditionalFeeOption {
        return this.additionalFeeOptions.find((option) => option.id === optionId);
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

    getProjectsByContractId() {

        return this.http.get<Project[]>(this.projectsUrl).pipe( // pass the originalContractId someday
            catchError(DataEntryService.handleError),
            delay(1000)
        );
    }

    getEntriesByProjectId() {
        return this.http.get<Entry[]>(this.entriesUrl).pipe( // pass the Originalprojectid someday
            catchError(DataEntryService.handleError),
            delay(1000)
        );
    }

    saveData() {
        console.log(JSON.stringify(this.buildEntryData()));
        // this.http.post('my-url',this.buildEntryData() )
    }


    private buildEntryData() {
        let item = new Entry();
        item.id = this.dataItem.id;
        item.UserId = this.userId;
        item.ContractId = this.originalContractId;
        item.SubContractId = this.originalProjectId; // todo rename
        item.Hours = this.form.value.Hours;
        item.Description = this.form.value.Description;
        // item.AdditionalFeeId = this.form.value.AdditionalFeeId.id;
        item.AdditionalFeeId = this.form.value.AdditionalFeeId;
        item.StartDateDisplay = DataEntryService.reFormatDate(this.form.value.StartDateDisplay) as string;

        return item;
    }

}
