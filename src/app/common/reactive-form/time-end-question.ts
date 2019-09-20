import {QuestionBaseComponent} from './question-base.component';

export class TimeEndQuestion extends QuestionBaseComponent<string> {
    controlType = 'timeEnd';


    constructor(options: {} = {}) {
        super(options);
    }
}
