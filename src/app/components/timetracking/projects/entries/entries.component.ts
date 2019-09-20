import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
export class EntriesComponent implements OnInit, OnDestroy {
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
        this.dataService.entries[this.index] = await this.dataService.getEntriesByProjectIds(this.index).toPromise();
        this.dataService.additionalFeeOptions =
            await this.dataService.getAdditionalFeeOptions().toPromise() as AdditionalFeeOption[];
        // make objects with id and value (value isnt a propper name, better will be "name" oder "displayName"
        this.dataService.entries[this.index].forEach((entry: Entry) => entry.AdditionalFeeId = this.dataService.getOptionValue(entry.AdditionalFeeId as string));
        this.showEntries = true;
    }

    ngOnDestroy(): void {

        this.dataService.originalProjectIds.length === 1
            ? this.dataService.originalProjectIds = []
            : this.dataService.originalProjectIds.splice(this.index, 1);
        this.dataService.entries.length === 1
            ? this.dataService.entries = []
            : this.dataService.entries.splice(this.index, 1);
    }

    open(entry?: Entry) {
        let item = entry ? entry : this.buildNewEntry();
        // toDo das ist etwas doppelt gemoppelt...das item kann auch nur in den Service und der Questionservice referiert das.
        console.log(item, 'ich bin das entry');
        this.questionService.entry = item;
        this.dataService.dataItem = item;
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.modalHeader = entry ? 'Editiere Eintrag' : 'Neuere Eintrag';
        modalRef.componentInstance.dataService = this.dataService;
        modalRef.componentInstance.index = this.index;
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
        let startDate = new Date();
        // ich defniere mal ein Arbeitsbegin von 8 als default
        startDate.setHours(8, 0, 0, 0);
        entry.StartDateDisplay = startDate;
        let endDate = new Date(); // nur für einen end Zeit Punkt
        endDate.setHours(17, 0, 0);
        entry.EndDateDisplay = undefined;
        entry.AdditionalFeeId = this.dataService.additionalFeeOptions.find((option) => option.value === 'Normal'); // we need a config
        return entry;
    }

}
