import { Component, Input } from '@angular/core';
import { Inventory } from '../models/inventory/inventory.model';

@Component({
	selector: 'app-inventory',
	templateUrl: './inventory.component.html',
	styles: []
})
export class InventoryComponent {
	protected item: Inventory = Inventory.fromObject({});

	onSelected(item: Inventory) {
		this.item = item;
	}
}
