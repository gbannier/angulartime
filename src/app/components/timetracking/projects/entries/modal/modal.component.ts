import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BaseModel} from '../../../../../common/models/base.model';
import {QuestionService} from '../form-data/question.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: []
})
export class ModalComponent implements OnInit {
  @Input() currentData: BaseModel; // ggf redundant TODO
  @Input() modalHeader: string;
  questions: any[];

  // TODO kann in Common
  constructor(public activeModal: NgbActiveModal, private questionService: QuestionService) {
  }

  ngOnInit() {
    this.questions =  this.questionService.getQuestions();
  }
}
