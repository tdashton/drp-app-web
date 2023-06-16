import { EventEmitter, Injectable } from '@angular/core';
import { Inventory } from '../models/inventory/inventory.model';
import { Observable, Observer, Operator, OperatorFunction, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  protected inventory: Inventory[] = [];
  public inventoryUpdated = new EventEmitter<Inventory>();

  constructor() {}

  public addInventory(inventory: Inventory) {
    this.inventory.push(inventory);
    this.inventoryUpdated.emit(inventory);
  }

  public getInventory(): Inventory[] {
    return [];
  }
}
