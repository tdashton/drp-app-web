export enum InventoryUnits {
	Meter = 'meter',
	Count = 'count',
};

export class Inventory {

	constructor(
		public id: string,
		public name: string,
		public unit: string,
		public description: string,
	) { }

	public static fromObject(obj: Partial<Inventory>): Inventory {
		const id: string = obj.id ? obj.id : '';
		const name: string = obj.name ? obj.name : '';
		const unit: string = obj.unit ? obj.unit : '';
		const description: string = obj.description ? obj.description : '';

		return new Inventory(id, name, unit, description);
	}
}