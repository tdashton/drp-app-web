import { TestBed } from '@angular/core/testing';
import { Manager } from './manager.class';
import { AppComponent } from '../app.component';
import { InventoryComponent } from '../inventory/inventory.component';
import { LocalizedString } from '@angular/compiler';
import { LocalStorageAdapter } from './local-storage-adapter.class';
import { StorageAdapter } from './storage-adapter.class';

class ArrayObjectTestModel {

  constructor (
    public subId: string,
  ) {}

  static modelFactory = (obj: Partial<ArrayObjectTestModel>): ArrayObjectTestModel => {
    return new ArrayObjectTestModel(
      obj.subId ?? '',
    );
  }
}

class TestModel {
  constructor(
    public id: string,
    public amount: number,
    public subObject: ArrayObjectTestModel[],
  ) {}

  static modelFactory = (obj: Partial<TestModel>): TestModel => {
    return new TestModel(
      obj.id ?? '',
      obj.amount ?? 0,
      obj.subObject ? obj.subObject.map(ArrayObjectTestModel.modelFactory) : [],
    );
  }
}

export class LocalStorageMock implements StorageAdapter {

  protected items: any = {};

  getItem(key: string): string | null {
    if (!this.items[key]) {
      return null;
    }

    return this.items[key];
  }

  setItem(key: string, item: any) {
    this.items[key] = item;
  }
}

describe('Manager', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      InventoryComponent,
    ]
  }));

  it('can create a manager', () => {
    const localStorageMock = new LocalStorageMock();
    const manager = new Manager<TestModel>(localStorageMock, 'test', () => new TestModel('a', 1, []));
    expect(manager).toBeDefined();
  });

  it('can create a model from json', () => {
    const localStorageMock = new LocalStorageMock();
    localStorageMock.setItem('test', '[{"id": "an id", "amount": 1, "subObject": [{"subId": "subId1"}, {"subId": "subId2"}]}]');

    const manager = new Manager<TestModel>(localStorageMock, 'test', TestModel.modelFactory);

    expect(manager).toBeDefined();
    const entities = manager.getAll();
    const firstEntity = entities[0];

    expect(firstEntity.id).toEqual('an id');
    expect(firstEntity.amount).toEqual(1);
    expect(firstEntity.subObject[1].subId).toEqual("subId2");
  });
});


