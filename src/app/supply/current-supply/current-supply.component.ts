import { Component, OnInit } from '@angular/core';
import { SupplyService } from '../supply.service';
import { Supply } from 'src/app/models/supply/supply.model';

@Component({
  selector: 'app-current-supply',
  templateUrl: './current-supply.component.html',
  styles: [
  ]
})
export class CurrentSupplyComponent implements OnInit {

  protected currentSupply!: Supply[];

  constructor(protected supplyService: SupplyService) {}

  ngOnInit(): void {
      this.supplyService.supplyUpdated.subscribe((supply: Supply) => {
        console.log("supply added");
      });
      this.currentSupply = this.supplyService.getSupply();
  }

}
