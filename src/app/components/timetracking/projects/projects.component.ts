import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../../common/models/project.model';
import {DataEntryService} from '../../../common/services/data-entry.service';
import {EntriesComponent} from "./entries/entries.component";

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
    @ViewChild('entries', {static: false}) entriesComponent: EntriesComponent;
    projectsTitle = 'Projekte für den ausgewählten Vertrag';
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

    loadFilteredEntries() {
        console.log('ghghg');
        // this.entriesComponent.reloadEntries();
    }

    ngOnDestroy(): void {
        this.projects = null;
        this.dataService.originalContractId = null;
        this.subscription.unsubscribe();
    }

}
