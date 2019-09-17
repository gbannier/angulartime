import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseModel} from "../../../../common/models/base.model";
import {DataEntryService} from "../../../../common/services/data-entry.service";
import {FilterType} from "../../../../common/enums/filter-type.enum";

// toDo->model
export interface TimeRange extends BaseModel {
    value: string;
}

@Component({
    selector: 'app-dropdown-filter',
    templateUrl: './dropdown-filter.component.html',
    styleUrls: ['./dropdown-filter.component.css']
})
export class DropdownFilterComponent implements OnInit {

    @Output() loadFilteredEntries = new EventEmitter<FilterType>();

    constructor(private dataService: DataEntryService) {
    }

    get selectedValue(): TimeRange {
        return this.dataService.selectedTimeRange;
    }

    set selectedValue(timeRange: TimeRange) {
        this.dataService.selectedTimeRange = timeRange;
    }

    get timeRanges(): TimeRange[] {
        return this.dataService.timeRanges;
    }

    set timeRanges(value: TimeRange[]) {
        this.dataService.timeRanges = value;
    }

    async ngOnInit() {
        this.dataService.timeRanges = await this.dataService.getTimeRanges().toPromise() as TimeRange[];
    }

    change() {
        this.loadFilteredEntries.emit(FilterType.TimeRange)

    }
}
