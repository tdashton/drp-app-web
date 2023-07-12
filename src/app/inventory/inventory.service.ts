import { EventEmitter, Injectable } from '@angular/core';
import { Inventory } from '../models/inventory/inventory.model';
import { Observable, Observer, Operator, OperatorFunction, Subscription } from 'rxjs';
import { Manager } from '../persistence/manager.class';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  protected static LOCAL_STORAGE_KEY = 'inventory';

  protected inventory: Inventory[] = [];
  protected inventoryManager: Manager<Inventory>;
  public inventoryUpdated = new EventEmitter<Inventory>();

  constructor() {
    this.inventoryManager = new Manager<Inventory>(
      localStorage,
      InventoryService.LOCAL_STORAGE_KEY,
      Inventory.fromObject
    );
    this.inventory = this.inventoryManager.getAllEntities();

    if (this.inventory.length === 0) {
      console.log('Inital populate of local inventory.');
      [
        new Inventory('1', 'Some inventory', 'meter', 'A description'),
        new Inventory('2', 'Other inventory', 'meter', 'Another description'),
        new Inventory('3', 'Keychain', 'count', 'This is a keychain'),
      ].forEach((newInventory: Inventory) => this.inventoryManager.insert(newInventory));
      this.inventoryManager.persist();
    }
  }

  public addInventory(inventory: Inventory) {
    const nextId = this.inventory
      .map((current: Inventory): number => Number.parseInt(current.id))
      .reduce((previous: number, current: number) => {
        if (current > previous) {
          return current;
        }
        return previous;
      }, 0) + 1;

    inventory.id = nextId.toString();

    this.inventoryManager.insert(inventory);
    this.inventoryUpdated.emit(inventory);
    this.inventoryManager.persist();
  }

  public getInventory(): Inventory[] {
    return this.inventory;
  }
}
