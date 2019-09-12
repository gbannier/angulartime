import {Component, Input, OnInit} from '@angular/core';
import {DataEntryService} from '../../../../common/services/data-entry.service';
import {Entry} from '../../../../common/models/entry.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './modal/modal.component';
import {QuestionService} from './form-data/question.service';
import {AdditionalFeeOption} from '../../../../common/models/additional-fee-option.model';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css'],
})
export class EntriesComponent implements OnInit {
  @Input() projectId;
  entries: Entry[];
  closeResult: string;

  constructor(
    private dataService: DataEntryService,
    private modalService: NgbModal,
    private questionService: QuestionService) {
  }

  async ngOnInit() {
    this.dataService.originalProjectId=this.projectId;
    this.entries = await this.dataService.getEntriesByProjectId().toPromise();
    this.dataService.additionalFeeOptions =
        await this.dataService.getAdditionalFeeOptions().toPromise() as AdditionalFeeOption[];
    // make objects with id and value (value isnt a propper name, better will be "name" oder "displayName"
    this.entries.forEach((entry: Entry)=>entry.AdditionalFeeId=this.dataService.getOptionValue(entry.AdditionalFeeId as string));
  }

  async open(entry: Entry) {
    this.questionService.entry = entry;
    this.dataService.dataItem = entry;
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.modalHeader = 'Editiere Eintrag';
    modalRef.componentInstance.dataService = this.dataService;
  }
 // REDUNDANT
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
