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
    @Input() index;

    showEntries: boolean = false;
    closeResult: string;

    constructor(
        private dataService: DataEntryService,
        private modalService: NgbModal,
        private questionService: QuestionService) {
    }

    get entries() {
        return this.dataService.entries;
    }

    async ngOnInit() {
        this.dataService.originalProjectIds[this.index] = this.projectId;
        this.dataService.entries[this.index] = await this.dataService.getEntriesByProjectId(this.index).toPromise();
        this.dataService.additionalFeeOptions =
            await this.dataService.getAdditionalFeeOptions().toPromise() as AdditionalFeeOption[];
        // make objects with id and value (value isnt a propper name, better will be "name" oder "displayName"
        this.dataService.entries[this.index].forEach((entry: Entry) => entry.AdditionalFeeId = this.dataService.getOptionValue(entry.AdditionalFeeId as string));
        this.showEntries = true;
    }

    open(entry?: Entry) {
        let item = entry ? entry : this.buildNewEntry();
        this.questionService.entry = item;
        this.dataService.dataItem = item;
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.modalHeader = entry ? 'Editiere Eintrag' : 'Neuere Eintrag';
        modalRef.componentInstance.dataService = this.dataService;
        modalRef.componentInstance.index = this.index;
    }

    async reloadEntries() {
        this.dataService.entries[this.index] = await this.dataService.getEntriesByProjectId(this.index).toPromise();
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

    private buildNewEntry(): Entry {
        let entry = new Entry();
        let date = new Date();
        date.setUTCHours(0, 0, 0, 0);
        entry.StartDateDisplay = date.toISOString();
        entry.AdditionalFeeId = this.dataService.additionalFeeOptions.find((option) => option.value === 'Normal'); // we need a config
        return entry;
    }

}
