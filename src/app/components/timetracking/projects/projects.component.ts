import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../../common/models/project.model';
import {DataEntryService} from '../../../common/services/data-entry.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
    projects: Project[] = null;
    private subscription: any;

    constructor(private route: ActivatedRoute, private dataService: DataEntryService) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.projects = null;
            this.dataService.entries = [];
            this.dataService.originalProjectIds = [];
            this.dataService.originalContractId = params.id;
            this.dataService.getProjectsByContractId().subscribe((projects: Project[]) => {
                this.projects = projects;
            });
        });
    }

    async loadFilteredEntries() {
        this.dataService.entries = [];
        for (let i = 0; i < this.dataService.originalProjectIds.length; i++) {
            if (this.dataService.originalProjectIds[i]) {
                this.dataService.entries[i] = await this.dataService.getEntriesByProjectId(i).toPromise();
            }
        }
    }

    ngOnDestroy(): void {
        this.projects = null;
        this.dataService.originalContractId = null;
        this.subscription.unsubscribe();
    }

}
