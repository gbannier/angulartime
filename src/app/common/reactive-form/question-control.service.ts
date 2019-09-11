import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionBaseComponent} from './question-base.component';


@Injectable()
export class QuestionControlService {
  constructor() {
  }

  toFormGroup(questions: QuestionBaseComponent<any>[]) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
