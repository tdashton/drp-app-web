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

  currentInventory!: Inventory[];
  subscription!: Subscription;

  constructor (protected inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.currentInventory = this.inventoryService.getInventory();
    this.subscription = this.inventoryService.inventoryUpdated.subscribe((inventory: Inventory) => {
      console.log(inventory);
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
