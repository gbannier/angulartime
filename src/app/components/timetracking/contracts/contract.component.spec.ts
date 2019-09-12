import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractComponent } from './contract.component';
import {AppRoutingModule} from "../../../app.routing.module";
import {PageNotFoundComponent} from "../../page-not-found/page-not-found.component";
import {ProjectsComponent} from "../projects/projects.component";
import {EntriesComponent} from "../projects/entries/entries.component";
import {ModalComponent} from "../projects/entries/modal/modal.component";
import {DynamicFormComponent} from "../../../common/reactive-form/dynamic-form/dynamic-form.component";
import {DynamicFormQuestionComponent} from "../../../common/reactive-form/dynamic-form-question/dynamic-form-question.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TimetrackingRoutingModule} from "../timetracking.routing.module";
import {DataEntryService} from "../../../common/services/data-entry.service";

describe('ContractComponent', () => {
  let component: ContractComponent;
  let fixture: ComponentFixture<ContractComponent>;

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
    fixture = TestBed.createComponent(ContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
