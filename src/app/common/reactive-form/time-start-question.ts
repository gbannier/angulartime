import {QuestionBaseComponent} from './question-base.component';

export class TimeStartQuestion extends QuestionBaseComponent<string> {
    controlType = 'timeStart';


    constructor(options: {} = {}) {
        super(options);
    }
}
