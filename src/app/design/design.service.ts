import { Injectable } from '@angular/core';
import { Design } from '../models/design/design.model';
import SupplyManager from '../persistence/supply.manager.service';
import { DesignInventory } from '../models/design/design-inventory.model';
import { Inventory } from '../models/inventory/inventory.model';
import { Supply } from '../models/supply/supply.model';

export enum InventoryXIXO {
  FIFO = 'fifo',
  LIFO = 'lifo'
};

interface SupplyCosts {
  amount: number,
  cost: number,
  total: number,
};

interface TotalCosts {
  total: number,
};

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  protected static LOCAL_STORAGE_KEY = 'design';

  constructor(public supplyManager: SupplyManager) {}

  public getRequiredSupplyBatches(design: Design, fifo: InventoryXIXO = InventoryXIXO.FIFO): Supply[][] {
    /** @todo make XIXO work correctly */

    let previewInventory: Supply[][] = [];

    for (let i = 0; i < design.inventory.length; i++) {
      /** @todo this should be an actual query against a db / REST api */
      const batchesOfThisInventory = this.supplyManager.getSupplyBatchesByInventoryId(design.inventory[i].inventoryId);

      let requiredInventoryAmount = design.inventory[i].amount;
      let foundSupplyBatches: Supply[] = [];

      batchesOfThisInventory.forEach((value: Supply) => {
        if (requiredInventoryAmount <= 0) {
          return;
        }
        requiredInventoryAmount -= value.amount;

        if (requiredInventoryAmount < 0) {
          value.amount += requiredInventoryAmount;
        }

        requiredInventoryAmount = Math.max(requiredInventoryAmount, 0);

        foundSupplyBatches.push(value);
      });

      previewInventory.push(foundSupplyBatches);
    }

    return previewInventory;
  }

  public previewCosts(design: Design, fifo: InventoryXIXO = InventoryXIXO.FIFO): SupplyCosts[][] {
    const inventory = this.getRequiredSupplyBatches(design, fifo);
    const costs: SupplyCosts[][] = [];

    inventory.forEach((supplies: Supply[], indexOuter: number) => {
      costs[indexOuter] = new Array();
      supplies.forEach((supply: Supply, indexInner: number) => {
        costs[indexOuter].push({ amount: supply.amount, cost: supply.cost, total: supply.cost * supply.amount });
      })
    });

    return costs;
  }

  public previewCostsSummary(design: Design, fifo: InventoryXIXO = InventoryXIXO.FIFO): TotalCosts {

    const reducedPreviewCosts: SupplyCosts[] = [];

    this.previewCosts(design, fifo).forEach((costs: SupplyCosts[]) => {
      reducedPreviewCosts.push(
        costs.reduce((prev: SupplyCosts, current: SupplyCosts) => {
          current.amount += prev.amount;
          current.cost += prev.cost;
          current.total += prev.total;

          return current;
        }, { amount: 0, cost: 0, total: 0 })
      )
    });

    return reducedPreviewCosts.reduce((prev: TotalCosts, current: TotalCosts) => {
      current.total += prev.total;

      return current;
    }, { total: 0 });
  }
}
