import { Injectable } from "@angular/core";
import { Design } from "../models/design/design.model";
import { Manager } from "./manager.class";
import { StorageAdapter } from "./storage-adapter.class";

@Injectable({
  providedIn: 'root'
})
export default class DesignManager {

  protected LOCAL_STORAGE_KEY = 'design';

  protected instance: Manager<Design> | null = null;

  protected storage: StorageAdapter;

  constructor(storage: StorageAdapter) {
    this.storage = storage;
  }

  public getInstance(): Manager<Design> {
    if (this.instance === null) {
      this.instance = new Manager<Design>(
        this.storage,
        this.LOCAL_STORAGE_KEY,
        Design.fromObject
      );
    }

    return this.instance;
  }
}
