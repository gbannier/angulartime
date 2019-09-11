import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Project} from '../../../common/models/project.model';
import {DataEntryService} from '../../../common/services/data-entry.service';
import {Contract} from '../../../common/models/contract.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectsTitle = 'Projekte für den ausgewählten Vertrag';
  projects: Project[] = undefined;
  constructor(private route: ActivatedRoute, private dataService: DataEntryService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.originalContractId = params.id;
      this.dataService.getProjectsByContractId().subscribe((projects: Project[]) => {
        this.projects = projects;
      });
    });
  }
}
