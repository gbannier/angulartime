import {QuestionBaseComponent} from './question-base.component';

export class NumberQuestion extends QuestionBaseComponent<string> {
  controlType = 'number';


  constructor(options: {} = {}) {
    super(options);
  }
}
