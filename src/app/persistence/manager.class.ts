
export interface LocalStorage {
  getItem(key: string): string | null;
  setItem(key: string, item: any): void;
};

export class Manager<TModel> {

  protected objects: TModel[] = [];

  protected populateDbCallback: () => void = () => {};

  public constructor(
    protected localStorage: LocalStorage,
    protected storageKey: string,
    protected factoryMethod: (object: any) => TModel,
  ) {}

  public setPopulateDbCallback(func: () => {}): void {
    this.populateDbCallback = func;
  };

  protected populateDb(): void {
    this.populateDbCallback();
  };

  public getAllEntities(): TModel[] {
    let data = this.localStorage.getItem(this.storageKey);

    if (!data) {
      return [];
    }

    const objects = JSON.parse(data);

    if (!Array.isArray(objects)) {
      return [];
    }

    this.objects = objects.map(this.factoryMethod);

    return this.objects;
  }

  public insert(model: TModel): void {
    this.objects.push(model);
  }

  public persist(): void {
    this.localStorage.setItem(this.storageKey, JSON.stringify(this.objects));
    console.log(this.objects);
  }
}
