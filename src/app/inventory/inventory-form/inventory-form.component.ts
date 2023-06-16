import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Inventory, InventoryUnits } from 'src/app/models/inventory/inventory.model';
import { InventoryService } from '../inventory.service';

@Component({
	selector: 'app-inventory-form',
	templateUrl: './inventory-form.component.html',
	styles: []
})
export class InventoryFormComponent {
	protected nameFormControl = new FormControl<string>('', [Validators.required]);
	protected unitFormControl = new FormControl();
	protected descriptionFormControl = new FormControl<string>('', [Validators.required]);

	protected inventoryForm!: FormGroup;

	protected units: string[] = [InventoryUnits.Count, InventoryUnits.Meter];

	public constructor(
		protected formBuilder: FormBuilder,
		protected inventory: InventoryService
	) {	}

	ngOnInit(): void {
		this.inventoryForm = new FormGroup({
			name: this.nameFormControl,
			unit: this.unitFormControl,
			description: this.descriptionFormControl,
		});
		this.inventoryForm
	}

	onSubmit() {
		if (!this.inventoryForm.valid) {
			if (this.nameFormControl.invalid) {
				console.log(this.nameFormControl.errors);
			}
			console.log(this.inventoryForm.status);
			return;
		}

		const inventory = Inventory.fromObject({
			name: this.nameFormControl.value !== null ? this.nameFormControl.value : undefined,
			unit: this.unitFormControl.value !== null ? this.unitFormControl.value : undefined,
			description: this.descriptionFormControl.value !== null ? this.descriptionFormControl.value : undefined,
		});

		this.inventory.addInventory(inventory);

		console.log('submitted:', this.nameFormControl.value, this.unitFormControl.value, this.descriptionFormControl.value);
	}

	public addInventory() {
		console.log('submitted:', this.nameFormControl.value, this.unitFormControl.value, this.descriptionFormControl.value);
	}
}
