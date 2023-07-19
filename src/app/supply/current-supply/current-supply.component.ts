import { Component, OnInit } from '@angular/core';
import { SupplyService } from '../supply.service';
import { Supply } from 'src/app/models/supply/supply.model';
import InventoryManager from 'src/app/persistence/inventory.manager.service';
import SupplyManager from 'src/app/persistence/supply.manager.service';

@Component({
  selector: 'app-current-supply',
  templateUrl: './current-supply.component.html',
  styles: [
  ]
})
export class CurrentSupplyComponent implements OnInit {

  protected currentSupply!: Supply[];

  constructor(
    protected supplyManager: SupplyManager,
    protected inventoryManager: InventoryManager,
  ) {}

  ngOnInit(): void {
      this.supplyManager.getInstance().modelUpdated.subscribe((supply: Supply) => {
        console.log("supply added");
      });
      this.currentSupply = this.supplyManager.getInstance().getAll();
  }
}
