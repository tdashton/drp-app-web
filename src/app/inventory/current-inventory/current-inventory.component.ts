import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Inventory } from 'src/app/models/inventory/inventory.model';
import { Subscription } from 'rxjs';
import InventoryManager from 'src/app/persistence/inventory.manager.service';

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
  @Output() addInventoryEvent = new EventEmitter();

  currentInventory!: Inventory[];
  subscription!: Subscription;

  constructor (protected inventoryManager: InventoryManager) { }

  ngOnInit(): void {
    this.currentInventory = this.inventoryManager.getInstance().getAll();
    this.subscription = this.inventoryManager.getInstance().modelUpdated.subscribe((inventory: Inventory) => {
      console.log(inventory);
    });
  }

  onClickAddInventory() {
    this.addInventoryEvent.emit();
  }

  onClickInventory(item: Inventory): void {
    this.inventorySelectedEvent.emit(item);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
