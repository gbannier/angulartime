import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicFormComponent} from './dynamic-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicFormQuestionComponent} from "../dynamic-form-question/dynamic-form-question.component";
import {ContractComponent} from "../../../components/timetracking/contracts/contract.component";
import {ProjectsComponent} from "../../../components/timetracking/projects/projects.component";
import {EntriesComponent} from "../../../components/timetracking/projects/entries/entries.component";
import {ModalComponent} from "../../../components/timetracking/projects/entries/modal/modal.component";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TimetrackingRoutingModule} from "../../../components/timetracking/timetracking.routing.module";
import {AppModule} from "../../../app.module";

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

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
          TimetrackingRoutingModule, AppModule,
        ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
