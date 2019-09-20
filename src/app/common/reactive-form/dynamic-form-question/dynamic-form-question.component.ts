import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {QuestionBaseComponent} from '../question-base.component';


@Component({
    selector: 'app-question',
    templateUrl: './dynamic-form-question.component.html',
    styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent implements OnInit {

    @Input() question: QuestionBaseComponent<any>;
    @Input() form: FormGroup;

    constructor() {

    }

    private _timeStart;

    get timeStart() {
        return this._timeStart;
    }

    set timeStart(value) {

        this._timeStart = value;
        if (value != undefined && this._timeEnd != undefined) {
            this.hoursByTimeRange()
        }

    }

    private _timeEnd;

    get timeEnd() {

        return this._timeEnd
    }

    set timeEnd(value) {
        this._timeEnd = value;

        if (value != undefined && this._timeStart != undefined) {
            this.hoursByTimeRange()
        }

    }

    get isValid() {
        return this.form.controls[this.question.key].valid;
    }

    ngOnInit(): void {
        this.timeStart = this.form.controls['StartTime'].value;
        this.timeEnd = this.form.controls['EndTime'].value;
    }

    hoursByTimeRange() {

        const hourEnd = this.form.controls['EndTime'].value.hour;
        const hourStart = this.form.controls['StartTime'].value.hour;

        const diffH = (hourEnd - hourStart);

        const minEnd = this.form.controls['EndTime'].value.minute;
        const minStart = this.form.controls['StartTime'].value.minute;

        const diffM = (minEnd - minStart);
        if (hourStart >= hourEnd && diffM <= 0) {
            this.form.controls['Hours'].setValue(0);
            return;
        }
        if (diffH > 0 || diffM != 0) {
            const diffDecHours = diffH + diffM / 60;
            this.form.controls['Hours'].setValue(+diffDecHours.toFixed(4));
        }

    }
}
