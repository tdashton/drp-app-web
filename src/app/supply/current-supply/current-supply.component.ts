import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { SupplyService } from '../supply.service';
import { Supply } from 'src/app/models/supply/supply.model';
import InventoryManager from 'src/app/persistence/inventory.manager.service';
import SupplyManager from 'src/app/persistence/supply.manager.service';
import { ActivatedRoute } from '@angular/router';
import { Inventory } from 'src/app/models/inventory/inventory.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-current-supply',
  templateUrl: './current-supply.component.html',
  styles: [
  ]
})
export class CurrentSupplyComponent implements OnInit, OnDestroy {

  protected currentSupply!: Supply[];

  protected subscription!: Subscription;

  @Input()
  inventoryItem!: Inventory;

  constructor(
    protected supplyManager: SupplyManager,
    protected inventoryManager: InventoryManager,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subscription = this.supplyManager.getInstance().modelUpdated.subscribe((supply: Supply) => {
      this.currentSupply.push(supply);
      console.log("supply added");
    });

    this.currentSupply = this.supplyManager.getSupplyBatchesByInventoryId(
      this.inventoryItem.id
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
