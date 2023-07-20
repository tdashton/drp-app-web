import { EventEmitter, Injectable } from '@angular/core';
import { Inventory } from '../models/inventory/inventory.model';
import { Observable, Observer, Operator, OperatorFunction, Subscription } from 'rxjs';
import { Manager } from '../persistence/manager.class';
import { LocalStorageAdapter } from '../persistence/local-storage-adapter.class';
import InventoryManager from '../persistence/inventory.manager.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  // protected inventory: Inventory[] = [];
  // protected inventoryManager: Manager<Inventory>;
  // public inventoryUpdated = new EventEmitter<Inventory>();

  constructor(protected inventoryManager: InventoryManager) {
    if (this.inventoryManager.getInstance().getAll().length === 0) {
      console.log('Inital populate of local inventory.');
      [
        new Inventory('1', 'Some inventory', 'meter', 'A description'),
        new Inventory('2', 'Other inventory', 'meter', 'Another description'),
        new Inventory('3', 'Keychain', 'count', 'This is a keychain'),
      ].forEach((newInventory: Inventory) => this.inventoryManager.getInstance().insert(newInventory));
      this.inventoryManager.getInstance();
    }

    console.log(this.inventoryManager.getInstance().getAll());
  }

  // public addInventory(inventory: Inventory) {
  //   const nextId = this.inventory
  //     .map((current: Inventory): number => Number.parseInt(current.id))
  //     .reduce((previous: number, current: number) => {
  //       if (current > previous) {
  //         return current;
  //       }
  //       return previous;
  //     }, 0) + 1;

  //   inventory.id = nextId.toString();

  //   this.inventoryManager.insert(inventory);
  //   this.inventoryUpdated.emit(inventory);
  //   this.inventoryManager.persist();
  // }

  // public modifyInventory(id: string, inventory: Inventory): void {
  //   const index = this.getInventoryIndexById(id);

  //   if (index === -1) {
  //     console.error('nothing found');
  //   }

  //   inventory.id = id;

  //   this.inventory[index] = inventory;
  //   this.inventoryUpdated.emit(inventory);
  //   this.inventoryManager.persist();
  // }

  // protected getInventoryIndexById(id: String): number {
  //   return this.inventory.findIndex((value: Inventory) => {
  //     return value.id === id;
  //   });
  // }

  // public getInventoryById(id: String): Inventory {
  //   const index = this.getInventoryIndexById(id);

  //   if (index === -1) {
  //     console.error('Inventory with given id not found', id, typeof id);
  //     console.log(this.inventory);
  //   }

  //   return this.inventory[index];
  // }

  // public getInventory(): Inventory[] {
  //   return this.inventory;
  // }
}
