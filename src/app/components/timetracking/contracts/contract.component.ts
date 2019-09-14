import {Component, OnInit} from '@angular/core';
import {Contract} from '../../../common/models/contract.model';
import {DataEntryService} from '../../../common/services/data-entry.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  timetracking = 'Zeiterfassung';
  contracts: Contract[] = undefined;

  constructor(private dataService: DataEntryService) {
  }

  ngOnInit() {
    this.dataService.getContracts().subscribe((contracts: Contract[]) => {
      this.contracts = contracts;
    });
  }
}
