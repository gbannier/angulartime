import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DateRangeFilterComponent} from './date-range-filter.component';
import {FormsModule} from "@angular/forms";

describe('DateRangeFilterComponent', () => {
    let component: DateRangeFilterComponent;
    let fixture: ComponentFixture<DateRangeFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DateRangeFilterComponent], imports: [FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DateRangeFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
