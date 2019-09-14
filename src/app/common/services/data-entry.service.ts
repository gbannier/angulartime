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
    projectsUrl = 'assets/projects/';
    entriesUrl = 'assets/projects/';
    additionalFeeOptionsUrl = 'assets/additionalfee-options.json';
    additionalFeeOptions: AdditionalFeeOption[];
    dataItem: Entry;
    originalContractId: string;
    originalProjectIds: string[] = [];
    startDate: NgbDateStruct;
    endDate: NgbDateStruct;
    entries: Entry[][] = [];

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
        if (ngDate) {
            let date = new Date(ngDate.year, ngDate.month - 1, ngDate.day);
            return date.toISOString();
        }
        return null;
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
        return this.http.get<Project[]>(this.projectsUrl + this.originalContractId + '/projects-data.json').pipe(
            catchError(DataEntryService.handleError),
            delay(1500)
        );
    }

    getEntriesByProjectId(i: number) {
        // console.log(i, 'index');
        // console.log(this.originalProjectIds, 'index');
        // console.log(DataEntryService.reFormatDate(this.startDate) as string);
        // console.log(DataEntryService.reFormatDate(this.endDate) as string);
        return this.http.get<Entry[]>(this.entriesUrl + this.originalContractId
            + '/entries/' + this.originalProjectIds[i] + '/entries-data.json').pipe(
            catchError(DataEntryService.handleError),
            delay(1000)
        );
    }

    saveData(index) {
        console.log(JSON.stringify(this.buildEntryData(index)));
        // this.http.post('my-url',this.buildEntryData() )
    }


    private buildEntryData(index) {
        let item = new Entry();
        item.id = this.dataItem.id;
        item.UserId = this.userId;
        item.ContractId = this.originalContractId;
        item.SubContractId = this.originalProjectIds[index]; // todo rename
        item.Hours = this.form.value.Hours;
        item.Description = this.form.value.Description;
        // item.AdditionalFeeId = this.form.value.AdditionalFeeId.id;
        item.AdditionalFeeId = this.form.value.AdditionalFeeId;
        item.StartDateDisplay = DataEntryService.reFormatDate(this.form.value.StartDateDisplay) as string;

        return item;
    }

}
