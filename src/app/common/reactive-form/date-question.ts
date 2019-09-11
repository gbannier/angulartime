import {QuestionBaseComponent} from './question-base.component';

export class DateQuestion extends QuestionBaseComponent<string> {
  controlType = 'date';


  constructor(options: {} = {}) {
    super(options);
  }
}
