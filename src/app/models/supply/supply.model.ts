import { FormGroup } from "@angular/forms";

export class Supply {

  constructor(
    public id: string,
    public info: string,
    public cost: number,
    public inventory_id: string,
    public amount: number,
  ) {}

  public static fromObject(obj: Partial<Supply>): Supply {
    const id: string = obj.id ? obj.id : '';
    const info: string = obj.info ? obj.info : '';
    const cost: number = obj.cost ? obj.cost : 0;
    const inventory_id: string = obj.inventory_id ? obj.inventory_id : '';
    const amount: number = obj.amount ? obj.amount : 0;

    return new Supply(id, info, cost, inventory_id, amount);
  }
}
