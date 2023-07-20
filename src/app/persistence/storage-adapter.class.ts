export abstract class StorageAdapter {
  abstract getItem(key: string): string | null;
  abstract setItem(key: string, item: string): void;
}
