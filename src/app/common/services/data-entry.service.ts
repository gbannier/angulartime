import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contract} from '../models/contract.model';
import {
    FirstDayOfLastMonth,
    FirstDayOfLastWeek,
    FirstDayOfMonth,
    GetLastMonday,
    LastDayOfLastMonth,
    LastDayOfLastWeek
} from '../utilities/date'
import {Observable} from 'rxjs';
import {catchError, delay} from 'rxjs/operators';
import {Project} from '../models/project.model';
import {Entry} from '../models/entry.model';
import {AdditionalFeeOption} from '../models/additional-fee-option.model';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {BaseDataService} from './base-data-service'
import {TimeRange} from "../../components/timetracking/projects/dropdown-filter/dropdown-filter.component";
import {FilterType} from "../enums/filter-type.enum";

@Injectable({
    providedIn: 'root',
})

export class DataEntryService extends BaseDataService {

    contractsUrl = 'assets/contracts-data.json';
    projectsUrl = 'assets/projects/';
    entriesUrl = 'assets/projects/';
    additionalFeeOptionsUrl = 'assets/additionalfee-options.json';
    additionalFeeOptions: AdditionalFeeOption[];
    timeRangeUrl = "assets/timeranges.json";
    timeRanges: TimeRange[];
    selectedTimeRange: TimeRange;
    dataItem: Entry;
    originalContractId: string;
    originalProjectIds: string[] = [];
    startDate: NgbDateStruct;
    endDate: NgbDateStruct;
    entries: Entry[][] = [];
    kw: number;
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

    static reFormatDate(ngDate: NgbDateStruct, returnDate?: boolean): string | Date {
        if (ngDate) {
            let date = new Date(ngDate.year, ngDate.month - 1, ngDate.day);
            return returnDate ? date : date.toISOString();
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

    getTimeRanges() {
        return this.http.get<TimeRange[]>(this.timeRangeUrl).pipe(
            catchError(BaseDataService.handleError),
            delay(300));
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

    getEntriesByProjectIds(i: number, filterType?: FilterType) {
        // TODO these funtions has to triggered earlier due to select dates before data is loaded
        if (filterType && filterType === FilterType.TimeRange) {
            this.timeRangeToDate();
        }
        if (filterType && filterType === FilterType.kw) {
            this.kwToDate();
        }
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

    kwToDate() {
        let date = new Date();
        let currentYear = date.getFullYear();
        let firstDayOfISOWeek = this.firstDateOfISOWeek(this.kw, currentYear)
        this.startDate = DataEntryService.formatDate(firstDayOfISOWeek);
        let lastDayOfISOWeek = this.lastWeekOfIsoWeek(this.kw, currentYear)
        this.endDate = DataEntryService.formatDate(lastDayOfISOWeek);
    }

    // TODO move to date utilitiues
    firstDateOfISOWeek(w, y) {
        let simple = new Date(y, 0, 1 + ((w - 1) * 7));
        let dow = simple.getDay();
        let ISOweekStart = simple;
        if (dow <= 4)
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        else
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        return ISOweekStart;
    }

    lastWeekOfIsoWeek(w, y) {
        let simple = new Date(y, 0, 1 + ((w - 1) * 7));
        let dow = simple.getDay();
        let ISOweekEnd = simple;
        if (dow <= 4)
            ISOweekEnd.setDate(simple.getDate() - simple.getDay() + 1 + 6);
        else
            ISOweekEnd.setDate(simple.getDate() + 8 - simple.getDay() + 6);
        return ISOweekEnd;
    }

    private timeRangeToDate() {
        switch (this.selectedTimeRange.id) {

            case '0': {
                let lastMonday = GetLastMonday(new Date());
                this.startDate = null;
                this.endDate = DataEntryService.formatDate(new Date());
                break;
            }
            case '1': {
                let lastMonday = GetLastMonday(new Date());
                this.startDate = DataEntryService.formatDate(lastMonday);
                this.endDate = DataEntryService.formatDate(new Date());
                break;
            }
            case '2': {
                let firstDayOfLastWeek = FirstDayOfLastWeek(new Date());
                this.startDate = DataEntryService.formatDate(firstDayOfLastWeek);
                let lastDayOfLastWeek = LastDayOfLastWeek(new Date());
                this.endDate = DataEntryService.formatDate(lastDayOfLastWeek);
                break;
            }
            case '3': {
                let firstDayOfLastMonth = FirstDayOfLastMonth(new Date());
                let firstDayOfMonth = FirstDayOfMonth(new Date());
                this.startDate = DataEntryService.formatDate(firstDayOfMonth);
                this.endDate = DataEntryService.formatDate(new Date());
                break;
            }
            case '4': {

                let firstDayOfLastMonth = FirstDayOfLastMonth(new Date());
                this.startDate = DataEntryService.formatDate(firstDayOfLastMonth);
                let lastDayOfLastMonth = LastDayOfLastMonth(new Date());
                this.endDate = DataEntryService.formatDate(lastDayOfLastMonth);
                break;
            }
        }
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
