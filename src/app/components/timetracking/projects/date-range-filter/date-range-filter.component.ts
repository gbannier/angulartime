import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataEntryService} from "../../../../common/services/data-entry.service";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-date-range-filter',
    templateUrl: './date-range-filter.component.html',
    styleUrls: ['./date-range-filter.component.css']
})
export class DateRangeFilterComponent implements OnInit {
    @Output() loadFilteredEntries = new EventEmitter()

    constructor(private dataService: DataEntryService) {
    }

    get disabled() {
        return !this.dataService.startDate;
    }

    get startDate(): NgbDateStruct {
        return this.dataService.startDate
    }

    set startDate(date) {
        this.dataService.startDate = date;
    }

    get endDate(): NgbDateStruct {
        return this.dataService.endDate
    }

    set endDate(date) {
        this.dataService.endDate = date;
    }

    ngOnInit() {
        this.dataService.endDate = DataEntryService.formatDate(new Date());
    }

    changeDate(date: NgbDateStruct, type: string) {

        if (type === "start") {
            this.dataService.startDate = date;
        }
        if (type === "end") {
            this.dataService.endDate = date;
        }
        this.loadFilteredEntries.emit()
    }
}

