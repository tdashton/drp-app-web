import { Injectable } from "@angular/core";
import { Inventory } from "../models/inventory/inventory.model";
import { Manager } from "./manager.class";
import { StorageAdapter } from "./storage-adapter.class";
import { ModelId } from "../models/model-id";
import { Supply } from "../models/supply/supply.model";

@Injectable({
  providedIn: 'root'
})
export default class InventoryManager {

  protected LOCAL_STORAGE_KEY = 'inventory';

  protected instance: Manager<Inventory> | null = null;

  protected storage: StorageAdapter;

  constructor(storage: StorageAdapter) {
    this.storage = storage;
  }

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
