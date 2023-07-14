import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Inventory } from 'src/app/models/inventory/inventory.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-current-inventory',
  templateUrl: './current-inventory.component.html',
  styles: [`
    .is-clickable {
      cursor: pointer;
    }
    .is-clickable:hover {
      background-color: bisque;
    }
  `]
})
export class CurrentInventoryComponent implements OnInit, OnDestroy {

  @Output() inventorySelectedEvent = new EventEmitter<Inventory>();

  currentInventory!: Inventory[];
  subscription!: Subscription;

  constructor (protected inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.currentInventory = this.inventoryService.getInventory();
    this.subscription = this.inventoryService.inventoryUpdated.subscribe((inventory: Inventory) => {
      console.log(inventory);
    });
  }

  onClickInventory(item: Inventory): void {
    this.inventorySelectedEvent.emit(item);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
