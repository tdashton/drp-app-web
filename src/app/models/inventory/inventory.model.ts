import { ModelId } from "../model-id";

export enum InventoryUnits {
	Meter = 'meter',
	Count = 'count',
};

export class Inventory {

	constructor(
		public id: ModelId, // todo number / psql id
		public name: string,
		public unit: string, // todo number
		public description: string,
	) { }

	public static createEmpty(): Inventory
	{
		return Inventory.fromObject({
			id: '',
			name: '',
			unit: '',
			description: '',
		})
	}

	public static fromObject(obj: Partial<Inventory>): Inventory {
		const id: string = obj.id ? obj.id : '';
		const name: string = obj.name ? obj.name : '';
		const unit: string = obj.unit ? obj.unit : '';
		const description: string = obj.description ? obj.description : '';

		return new Inventory(id, name, unit, description);
	}
}
