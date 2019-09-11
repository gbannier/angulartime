import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {QuestionControlService} from '../question-control.service';
import {QuestionBaseComponent} from '../question-base.component';
import {BaseModel} from "../../models/base.model";


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBaseComponent<any>[] = [];
  @Output() save = new EventEmitter<BaseModel>();
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    this.save.emit(this.form.value);
  }
}
