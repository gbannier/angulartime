import {Injectable} from '@angular/core';
import {QuestionBaseComponent} from '../../../../../common/reactive-form/question-base.component';
import {DropdownQuestion} from '../../../../../common/reactive-form/dropdown-question';
import {TextboxQuestion} from '../../../../../common/reactive-form/textbox-question';
import {Entry} from '../../../../../common/models/entry.model';
import {TextareaQuestion} from '../../../../../common/reactive-form/textarea-question';
import {NumberQuestion} from '../../../../../common/reactive-form/number-question';
import {DateQuestion} from '../../../../../common/reactive-form/date-question';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../../../common/services/data.service';
import {AdditionalFeeOption} from '../../../../../common/models/additional-fee-option.model';


@Injectable()
export class QuestionService {
  entry: Entry;

  constructor(private dataService: DataService) {

  }

   getQuestions() {

    const questions: QuestionBaseComponent<any>[] = [


      new TextareaQuestion({
        key: 'Description',
        label: 'Beschreibung',
        value: this.entry.Description,
        required: true,
        order: 1,
      }),

      new NumberQuestion({
        key: 'Hours',
        label: 'Anzahl Stunden',
        type: 'number',
        value: this.entry.Hours,
        order: 2,
      }),

      new DateQuestion({
        key: 'StartDateDisplay',
        label: 'Tag',
        type: 'date',
        value: DataService.formatDate(new Date(this.entry.StartDateDisplay)),
        order: 3,
      }),

      new DropdownQuestion({
        key: 'AdditionalFeeId',
        label: 'Stundenart',
        options: this.dataService.additionalFeeOptions,
        value: this.entry.AdditionalFeeId,

        order: 4
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
