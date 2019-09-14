import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {QuestionControlService} from '../question-control.service';
import {QuestionBaseComponent} from '../question-base.component';
import {BaseModel} from "../../models/base.model";
import {BaseDataService} from "../../services/base-data-service";


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBaseComponent<BaseModel>[] = [];
  @Input() dataService: BaseDataService;
  payLoad = '';
  form: FormGroup;
    @Input() index: number;
  constructor(private qcs: QuestionControlService) {
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    this.dataService.form=this.form;
      this.dataService.saveData(this.index);

  }
}
