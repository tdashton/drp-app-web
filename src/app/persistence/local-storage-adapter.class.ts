import { Injectable } from "@angular/core";
import { StorageAdapter } from "./storage-adapter.class";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageAdapter extends StorageAdapter {

  protected localStorage: StorageAdapter;

  constructor() {
    super();
    this.localStorage = localStorage;
  }

  getItem(key: string): string | null {
    const ret = this.localStorage.getItem(key);

    if (!ret) {
      return null;
    }

    return ret;
  }

  setItem(key: string, item: string): void {
    this.localStorage.setItem(key, item);
  }
}
