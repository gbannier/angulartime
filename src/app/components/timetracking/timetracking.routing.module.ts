import {ContractComponent} from './contracts/contract.component';
import {ProjectsComponent} from './projects/projects.component';
import { RouterModule, Routes } from '@angular/router';

import {NgModule} from '@angular/core';

const timetrackingroutes: Routes = [
  { path: '', component: ContractComponent, children: [
      {path: 'projects/:id', component: ProjectsComponent}
    ]},
];



@NgModule({
  imports: [RouterModule.forChild(timetrackingroutes)],
  exports: [RouterModule]
})

export class TimetrackingRoutingModule {}
