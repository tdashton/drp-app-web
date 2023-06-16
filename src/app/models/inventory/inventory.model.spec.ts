import { TestBed } from '@angular/core/testing';

import { Inventory } from './inventory.model';

describe('Inventory Model', () => {
    let model: Inventory;

    // beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(InventoryService);
    // });

    it('can be created directly', () => {
        let test = new Inventory('1', 'name', 'meter', 'description');

        expect(test).toBeInstanceOf(Inventory);
    });
    it('can be created from json', () => {
        let testJson = {description: 'description', name: 'name', unit: 'meter', id: '1'};
        let testModel = Inventory.fromObject(testJson);

        expect(testModel).toBeInstanceOf(Inventory);
        expect(testModel.name).toEqual('name');
        expect(testModel.description).toEqual('description');
        expect(testModel.unit).toEqual('meter');
        expect(testModel.id).toEqual('1');
    });
});
