import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ContractComponent } from './contracts/contract.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';
import {TimetrackingRoutingModule} from './timetracking.routing.module';
import {CommonModule} from '@angular/common';
import {EntriesComponent} from './projects/entries/entries.component';
import {ModalComponent} from './projects/entries/modal/modal.component';
import {DynamicFormComponent} from '../../common/reactive-form/dynamic-form/dynamic-form.component';
import {DynamicFormQuestionComponent} from '../../common/reactive-form/dynamic-form-question/dynamic-form-question.component';
import {QuestionService} from './projects/entries/form-data/question.service';


@NgModule({
  declarations: [
    ContractComponent,
    ProjectsComponent,
    EntriesComponent,
    ModalComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    TimetrackingRoutingModule,
    ReactiveFormsModule

  ],
  providers: [QuestionService],
  exports: [ContractComponent],
  entryComponents: [ModalComponent]

})
export class TimetrackingModule { }
