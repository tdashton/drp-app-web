import { ModelId } from "../model-id";
import { DesignInventory } from "./design-inventory.model";

export class Design {
  
  constructor(
    public id: ModelId,
    public name: string,
    public description: string,
    public inventory: DesignInventory[],
   ) {}

    public static fromObject(obj: Partial<Design>): Design {
    const id: ModelId = obj.id ? obj.id : '';
    const name: string = obj.name ? obj.name : '';
    const description: string = obj.description ? obj.description : '';
    const inventory: DesignInventory[] = obj.inventory ? obj.inventory.map((obj) => DesignInventory.fromObject(obj)) : [];

    return new Design(id, name, description, inventory);
  }
}
