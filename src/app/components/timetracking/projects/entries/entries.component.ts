import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../../common/services/data.service';
import {Entry} from '../../../../common/models/entry.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './modal/modal.component';
import {QuestionService} from './form-data/question.service';
import {AdditionalFeeOption} from '../../../../common/models/additional-fee-option.model';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
  providers: []
})
export class EntriesComponent implements OnInit {
  @Input() projectId;
  entries: Entry[];
  closeResult: string;

  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    private questionService: QuestionService) {
  }

  ngOnInit() {
    this.dataService.getEntriesByProjectId(this.projectId).subscribe(
      (entries: Entry[]) => {
        this.entries = entries;
      });
  }

  async open(entry: Entry) {
    this.questionService.entry = entry;
    this.questionService.additionalFeeOptions =
      await this.dataService.getAdditionalFeeOptions().toPromise() as AdditionalFeeOption[];
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.currentData = entry; // ToDo redundant
    modalRef.componentInstance.modalHeader = 'Editiere Eintrag';
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
