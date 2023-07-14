import { ModelId } from "../model-id";

export class Design {
  
  constructor(
    public id: ModelId,
    public name: string,
    public description: string,
    public inventoryReqired: any,
   ) {}
}
