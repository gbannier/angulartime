import {QuestionBaseComponent} from './question-base.component';

export class TextareaQuestion extends QuestionBaseComponent<string> {
  controlType = 'textarea';


  constructor(options: {} = {}) {
    super(options);
  }
}
