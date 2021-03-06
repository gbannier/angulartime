import {Injectable} from '@angular/core';
import {QuestionBaseComponent} from '../../../../../common/reactive-form/question-base.component';
import {DropdownQuestion} from '../../../../../common/reactive-form/dropdown-question';
import {Entry} from '../../../../../common/models/entry.model';
import {TextareaQuestion} from '../../../../../common/reactive-form/textarea-question';
import {NumberQuestion} from '../../../../../common/reactive-form/number-question';
import {DateQuestion} from '../../../../../common/reactive-form/date-question';
import {DataEntryService} from '../../../../../common/services/data-entry.service';
import {AdditionalFeeOption} from '../../../../../common/models/additional-fee-option.model';
import {TimeStartQuestion} from "../../../../../common/reactive-form/time-start-question";
import {TimeEndQuestion} from "../../../../../common/reactive-form/time-end-question";


@Injectable()
export class QuestionService {
  entry: Entry;

  constructor(private dataService: DataEntryService) {

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
        required: false,
        value: this.entry.Hours,
        order: 2,
        readonly: true
      }),

      new TimeStartQuestion({
        key: 'StartTime',
        label: 'Anfangszeit',
        type: 'timeStart',
        value: DataEntryService.formatTime(new Date(this.entry.StartDateDisplay), true),
        order: 3,
      }),

      new TimeEndQuestion({
        key: 'EndTime',
        label: 'Endzeit',
        type: 'timeEnd',
        value: DataEntryService.formatTime(new Date(this.entry.EndDateDisplay), true),
        order: 4,
      }),
      new DateQuestion({
        key: 'StartDateDisplay',
        label: 'Tag',
        type: 'date',
        value: DataEntryService.formatDate(new Date(this.entry.StartDateDisplay)),
        order: 5,
      }),
      new DropdownQuestion({
        key: 'AdditionalFeeId',
        label: 'Stundenart',
        options: this.dataService.additionalFeeOptions,
        // not the best approuch, alternativle we could add a temp property
        value: (this.entry.AdditionalFeeId as AdditionalFeeOption).id,
        order: 6
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
