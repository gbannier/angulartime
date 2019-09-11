import {QuestionBaseComponent} from './question-base.component';

export class TextboxQuestion extends QuestionBaseComponent<string> {
  controlType = 'textbox';

  constructor(options: {} = {}) {
    super(options);
  }
}
