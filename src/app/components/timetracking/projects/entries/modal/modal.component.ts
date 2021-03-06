import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {QuestionService} from '../form-data/question.service';
import {BaseDataService} from "../../../../../common/services/base-data-service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: []
})
export class ModalComponent implements OnInit {
  @Input() modalHeader: string;

  questions: any[];
  dataService: BaseDataService;
  index: number;

  // TODO kann in Common
  constructor(public activeModal: NgbActiveModal, private questionService: QuestionService) {
  }

  ngOnInit() {
    this.questions =  this.questionService.getQuestions();
  }
}
