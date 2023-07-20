import { DesignInventory } from "../models/design/design-inventory.model";
import { Design } from "../models/design/design.model";
import { Inventory } from "../models/inventory/inventory.model";
import { Supply } from "../models/supply/supply.model";
import { StorageAdapter } from "../persistence/storage-adapter.class";
import SupplyManager from "../persistence/supply.manager.service";
import { DesignService } from "./design.service";

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

const SUPPLY_FIXTURES = `
[
    {
        "amount": 1,
        "cost": 12,
        "id": "1",
        "info": "from somewhere",
        "inventoryId": "1"
    },
    {
        "amount": 5,
        "cost": 11,
        "id": "2",
        "info": "from somewhere else",
        "inventoryId": "1"
    },
    {
        "amount": 2,
        "cost": 66,
        "id": "3",
        "info": "inv id 3 supply id 3",
        "inventoryId": "3"
    },
    {
        "amount": 2,
        "cost": 67,
        "id": "4",
        "info": "654",
        "inventoryId": "4"
    },
    {
        "amount": 1,
        "cost": 55,
        "id": "5",
        "info": "",
        "inventoryId": "5"
    }
]`;

const INVENTORY_FIXTURES = `
[
  {
    "description": "A description",
    "id": "1",
    "name": "Some inventory",
    "unit": "meter"
  },
  {
    "description": "Another description",
    "id": "2",
    "name": "Other inventory",
    "unit": "meter"
  },
  {
    "description": "This is a keychain",
    "id": "3",
    "name": "Keychain",
    "unit": "count"
  },
  {
    "description": "some string",
    "id": "1",
    "name": "Some String",
    "unit": "meter"
  },
  {
    "description": "Some filz shit",
    "id": "4",
    "name": "Filz",
    "unit": "meter"
  },
  {
    "description": "dodo",
    "id": "5",
    "name": "Kette",
    "unit": "meter"
  },
  {
    "description": "dodo",
    "id": "6",
    "name": "Filz Grün 8mm",
    "unit": "meter"
  }
]
`;

describe("DesignService", () => {
  it("should create the service", () => {
    const service = new DesignService(new SupplyManager(new LocalStorageMock()));
    expect(service).toBeTruthy();
  });

  it("correctly gets the required supplyBatches", () => {
    const mock = new LocalStorageMock();
    mock.setItem('supply', SUPPLY_FIXTURES);

    mock.setItem('inventory', INVENTORY_FIXTURES);

    const service = new DesignService(new SupplyManager(mock));
    expect(service).toBeTruthy();

    const designInventory = [new DesignInventory('1', 4), new DesignInventory('3', 2)];
    const design = new Design('1', 'test design', 'description', designInventory);

    const batches = service.getRequiredSupplyBatches(design);

    expect(batches[0].length).toBe(2);

    // "some inventory"
    expect(batches[0][0].amount).toBe(1);
    expect(batches[0][0].cost).toBe(12);

    expect(batches[0][1].amount).toBe(3);
    expect(batches[0][1].cost).toBe(11);

    // keychain
    expect(batches[1].length).toBe(1);

    expect(batches[1][0].amount).toBe(2);
    expect(batches[1][0].cost).toBe(66);
  });

  it("correctly previews the costs", () => {
    const mock = new LocalStorageMock();
    mock.setItem('supply', SUPPLY_FIXTURES);
    mock.setItem('inventory', INVENTORY_FIXTURES);

    const service = new DesignService(new SupplyManager(mock));
    expect(service).toBeTruthy();

    const designInventory = [new DesignInventory('1', 4), new DesignInventory('3', 2)];
    const design = new Design('1', 'test design', 'description', designInventory);

    const costs = service.previewCostsSummary(design);

    const expected = 1 * 12 + 3 * 11 + 66 * 2;

    expect(costs.total).toEqual(expected);
  });
});
