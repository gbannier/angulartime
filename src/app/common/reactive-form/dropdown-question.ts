import {QuestionBaseComponent} from './question-base.component';

export class DropdownQuestion extends QuestionBaseComponent<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
