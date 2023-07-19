import { Injectable } from "@angular/core";
import { LocalStorage } from "./manager.class";
import { StorageAdapter } from "./storage-adapter.class";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageAdapter implements StorageAdapter {

  protected localStorage: LocalStorage;

  constructor() {
    this.localStorage = localStorage;
  }

  getItem(key: string): string | null {
    const ret = this.localStorage.getItem(key) as string;

    if (!ret) {
      return null;
    }

    return ret;
  }

  setItem(key: string, item: string): void {
    this.localStorage.setItem(key, item);
  }
}
