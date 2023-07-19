import { Injectable } from "@angular/core";
import { LocalStorageAdapter } from "./local-storage-adapter.class";
import { LocalStorage, Manager } from "./manager.class";
import { Supply } from "../models/supply/supply.model";

@Injectable({
  providedIn: 'root'
})
export default class SupplyManager {

  protected LOCAL_STORAGE_KEY = 'supply';

  protected instance: Manager<Supply> | null = null;

  constructor(protected storage: LocalStorageAdapter) {}

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
}
