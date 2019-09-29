import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EntriesComponent} from './entries.component';
import {DataEntryService} from "../../../../common/services/data-entry.service";
import {ContractComponent} from "../../contracts/contract.component";
import {ProjectsComponent} from "../projects.component";
import {ModalComponent} from "./modal/modal.component";
import {DynamicFormComponent} from "../../../../common/reactive-form/dynamic-form/dynamic-form.component";
import {DynamicFormQuestionComponent} from "../../../../common/reactive-form/dynamic-form-question/dynamic-form-question.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TimetrackingRoutingModule} from "../../timetracking.routing.module";
import {TimetrackingModule} from "../../timetracking.module";

describe('EntriesComponent', () => {
  let component: EntriesComponent;
  let fixture: ComponentFixture<EntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractComponent,
        ProjectsComponent,
        EntriesComponent,
        ModalComponent,
        DynamicFormComponent,
        DynamicFormQuestionComponent],
      imports: [CommonModule, TimetrackingModule,
        FormsModule,
        NgbModule,
        TimetrackingRoutingModule,
        ReactiveFormsModule],
      providers: [DataEntryService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
