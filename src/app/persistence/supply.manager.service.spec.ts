import { filter } from "rxjs";
import { Supply } from "../models/supply/supply.model";
import { LocalStorageMock } from "./manager.class.spec";
import SupplyManager from "./supply.manager.service";

const SUPPLY_FIXTURES = `
[
    {
        "amount": 5,
        "cost": 12,
        "id": "1",
        "info": "from somewhere",
        "inventoryId": "1"
    },
    {
        "amount": 1,
        "cost": 11,
        "id": "2",
        "info": "from somewhere else",
        "inventoryId": "1"
    },
    {
        "amount": 2,
        "cost": 66,
        "id": "3",
        "info": "",
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
]
`;

describe('SupplyManager', () => {
  it('filters supply batches by inventory id', () => {
    const mock = new LocalStorageMock();
    mock.setItem('supply', SUPPLY_FIXTURES);

    const service = new SupplyManager(mock);
    expect(service).toBeTruthy();

    const filteredSupply = service.getSupplyBatchesByInventoryId("1");
    expect(filteredSupply.length).toBe(2);

    expect(filteredSupply[0].info).toBe("from somewhere");
    expect(filteredSupply[1].info).toBe("from somewhere else");
    expect(filteredSupply[0].amount).toBe(5);
    expect(filteredSupply[1].amount).toBe(1);
  })
});