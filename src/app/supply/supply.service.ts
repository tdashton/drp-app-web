import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Supply } from '../models/supply/supply.model';
import { Manager } from '../persistence/manager.class';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {
  protected static LOCAL_STORAGE_KEY = 'supply';

  protected supply: Supply[] = [];
  protected supplyManager: Manager<Supply>;
  public supplyUpdated = new EventEmitter<Supply>();

  constructor() {
    this.supplyManager = new Manager<Supply>(
      localStorage,
      SupplyService.LOCAL_STORAGE_KEY,
      Supply.fromObject
    );

    this.supply = this.supplyManager.getAllEntities();

    if (this.supply.length === 0) {
      console.log('Inital populate of local supply.');
      [ ].forEach((newInventory: Supply) => this.supplyManager.insert(newInventory));
      this.supplyManager.persist();
    }

    this.supplyManager.persist();
  }

  protected persistInventoryToLocalStorage(): void {
    const data = JSON.stringify(this.supply);
    localStorage.setItem(SupplyService.LOCAL_STORAGE_KEY, data);
  }

  public addSupply(supply: Supply) {
    this.supplyManager.insert(supply);
    this.supplyUpdated.emit(supply);
    this.supplyManager.persist();
  }

  public getSupply(): Supply[] {
    return this.supply;
  }
}
