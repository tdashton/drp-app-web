import { ModelId } from "../model-id";
import { Inventory } from "../inventory/inventory.model";

export class DesignInventory {

  constructor(
    public inventoryId: ModelId,
    public amount: number,
  ) {}

  public static fromObject(obj: Partial<DesignInventory>): DesignInventory {
    const inventoryId: ModelId = obj.inventoryId ? obj.inventoryId : '';
    const amount: number = obj.amount ? obj.amount : 0;

    return new DesignInventory(inventoryId, amount);
  }

  public static fromInventoryWithAmount(inventory: Inventory, amount: number): DesignInventory {
    return new DesignInventory(inventory.id, amount);
  }
}
