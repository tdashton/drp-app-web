import { Injectable } from "@angular/core";
import { Supply } from "../models/supply/supply.model";
import { Manager } from "./manager.class";
import { StorageAdapter } from "./storage-adapter.class";
import { ModelId } from "../models/model-id";

@Injectable({
  providedIn: 'root'
})
export default class SupplyManager {

  protected LOCAL_STORAGE_KEY = 'supply';

  protected instance: Manager<Supply> | null = null;

  protected storage: StorageAdapter;

  constructor(storage: StorageAdapter) {
    this.storage = storage;
  }

  public getInstance(): Manager<Supply> {
    if (this.instance === null) {
      this.instance = new Manager<Supply>(
        this.storage,
        this.LOCAL_STORAGE_KEY,
        Supply.fromObject
      );
    }

    return this.instance;
  }

  public getSupplyBatchesByInventoryId(inventoryId: ModelId): Supply[] {
    return this.getInstance().getAll().filter((value: Supply) => value.inventoryId === inventoryId);
  }
}
