import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalComponent} from './modal.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TimetrackingRoutingModule} from "../../../timetracking.routing.module";
import {ContractComponent} from "../../../contracts/contract.component";
import {ProjectsComponent} from "../../projects.component";
import {EntriesComponent} from "../entries.component";
import {DynamicFormComponent} from "../../../../../common/reactive-form/dynamic-form/dynamic-form.component";
import {DynamicFormQuestionComponent} from "../../../../../common/reactive-form/dynamic-form-question/dynamic-form-question.component";
import {DataEntryService} from "../../../../../common/services/data-entry.service";

describe('ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContractComponent,
                ProjectsComponent,
                EntriesComponent,
                ModalComponent,
                DynamicFormComponent,
                DynamicFormQuestionComponent],
            imports: [CommonModule,
                FormsModule,
                NgbModule,
                TimetrackingRoutingModule,
                ReactiveFormsModule],
            providers: [DataEntryService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
