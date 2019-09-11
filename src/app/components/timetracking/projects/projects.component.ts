import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Project} from '../../../common/models/project.model';
import {DataService} from '../../../common/services/data.service';
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
  contractId: string;
  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contractId = params.id;
      this.dataService.getProjectsByContractId(this.contractId).subscribe((projects: Project[]) => {
        this.projects = projects;
      });
    });
  }
}
