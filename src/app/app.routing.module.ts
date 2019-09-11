import { RouterModule, Routes } from '@angular/router';
import {ContractComponent} from './components/timetracking/contracts/contract.component';
import {ProjectsComponent} from './components/timetracking/projects/projects.component';
import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {TimetrackingModule} from './components/timetracking/timetracking.module';

const appRoutes: Routes = [
  { path: 'timetracking', loadChildren: () => import('./components/timetracking/timetracking.module').then(m => m.TimetrackingModule) },
  { path: '',
    redirectTo: '/timetracking',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
