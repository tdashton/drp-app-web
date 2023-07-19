import { Injectable } from "@angular/core";
import { Inventory } from "../models/inventory/inventory.model";
import { LocalStorageAdapter } from "./local-storage-adapter.class";
import { LocalStorage, Manager } from "./manager.class";

@Injectable({
  providedIn: 'root'
})
export default class InventoryManager {

  protected LOCAL_STORAGE_KEY = 'inventory';

  protected instance: Manager<Inventory> | null = null;

  constructor(protected storage: LocalStorageAdapter) {}

  public getInstance(): Manager<Inventory> {
    if (this.instance === null) {
      this.instance = new Manager<Inventory>(
        this.storage,
        this.LOCAL_STORAGE_KEY,
        Inventory.fromObject
      );
    }

    return this.instance;
  }
}
