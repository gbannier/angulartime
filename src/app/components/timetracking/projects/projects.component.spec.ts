import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectsComponent} from './projects.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TimetrackingRoutingModule} from "../timetracking.routing.module";
import {ContractComponent} from "../contracts/contract.component";
import {EntriesComponent} from "./entries/entries.component";
import {ModalComponent} from "./entries/modal/modal.component";
import {DynamicFormComponent} from "../../../common/reactive-form/dynamic-form/dynamic-form.component";
import {DynamicFormQuestionComponent} from "../../../common/reactive-form/dynamic-form-question/dynamic-form-question.component";
import {AppRoutingModule} from "../../../app.routing.module";
import {DataEntryService} from "../../../common/services/data-entry.service";

describe('ProjectsComponent', () => {
    let component: ProjectsComponent;
    let fixture: ComponentFixture<ProjectsComponent>;

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
                ReactiveFormsModule,AppRoutingModule],
            providers: [DataEntryService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
