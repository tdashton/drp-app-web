import { FormGroup } from "@angular/forms";
import { ModelId } from "../model-id";

export class Supply {

  constructor(
    public id: ModelId,
    public info: string,
    public cost: number,
    public inventoryId: string,
    public amount: number,
  ) {}

  public static fromObject(obj: Partial<Supply>): Supply {
    const id: ModelId = obj.id ? obj.id : '';
    const info: string = obj.info ? obj.info : '';
    const cost: number = obj.cost ? obj.cost : 0;
    const inventoryId: string = obj.inventoryId ? obj.inventoryId : '';
    const amount: number = obj.amount ? obj.amount : 0;

    return new Supply(id, info, cost, inventoryId, amount);
  }
}
