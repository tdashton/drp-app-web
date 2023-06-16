import { Component, OnDestroy, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Inventory } from 'src/app/models/inventory/inventory.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-current-inventory',
  templateUrl: './current-inventory.component.html',
  styles: [
  ]
})
export class CurrentInventoryComponent implements OnInit, OnDestroy {

  currentInventory: Inventory[];
  subscription!: Subscription;

  constructor (protected inventoryService: InventoryService) {
    this.currentInventory = this.inventoryService.getInventory();
  }

  ngOnInit(): void {
    this.subscription = this.inventoryService.inventoryUpdated.subscribe((inventory: Inventory) => {
      console.log(inventory);
      this.currentInventory.push(inventory);
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
