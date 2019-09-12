import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import {ContractComponent} from "../../../components/timetracking/contracts/contract.component";
import {ProjectsComponent} from "../../../components/timetracking/projects/projects.component";
import {EntriesComponent} from "../../../components/timetracking/projects/entries/entries.component";
import {ModalComponent} from "../../../components/timetracking/projects/entries/modal/modal.component";
import {DynamicFormComponent} from "../dynamic-form/dynamic-form.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TimetrackingRoutingModule} from "../../../components/timetracking/timetracking.routing.module";

describe('DynamicFormQuestionComponent', () => {
  let component: DynamicFormQuestionComponent;
  let fixture: ComponentFixture<DynamicFormQuestionComponent>;

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
        ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
