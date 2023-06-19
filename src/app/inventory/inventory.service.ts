import { EventEmitter, Injectable } from '@angular/core';
import { Inventory } from '../models/inventory/inventory.model';
import { Observable, Observer, Operator, OperatorFunction, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  protected static LOCAL_STORAGE_KEY = 'inventory';

  protected inventory: Inventory[] = [];
  public inventoryUpdated = new EventEmitter<Inventory>();

  constructor() {
    let data = localStorage.getItem(InventoryService.LOCAL_STORAGE_KEY);
    console.log(data);

    if (!data) {
      console.log('Inital populate of local inventory.');
      this.inventory = [
        new Inventory('1', 'Some inventory', 'meter', 'A description'),
        new Inventory('2', 'Other inventory', 'meter', 'Another description'),
        new Inventory('3', 'Keychain', 'count', 'This is a keychain'),
      ];
      data = JSON.stringify(this.inventory);
      this.persistInventoryToLocalStorage();
    }

    this.inventory = JSON.parse(data);
  }

  protected persistInventoryToLocalStorage(): void {
    const data = JSON.stringify(this.inventory);
    localStorage.setItem(InventoryService.LOCAL_STORAGE_KEY, data);
  }

  public addInventory(inventory: Inventory) {
    this.inventory.push(inventory);
    this.inventoryUpdated.emit(inventory);
    this.persistInventoryToLocalStorage();
  }

  public getInventory(): Inventory[] {
    return this.inventory;
  }
}
