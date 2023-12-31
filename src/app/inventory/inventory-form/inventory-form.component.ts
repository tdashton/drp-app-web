import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Inventory, InventoryUnits } from 'src/app/models/inventory/inventory.model';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';
import { compileNgModule } from '@angular/compiler';
import InventoryManager from 'src/app/persistence/inventory.manager.service';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styles: [`
    input.ng-touched.ng-invalid {
      border: 1px solid red;
    }
  `]
})
export class InventoryFormComponent implements OnChanges {
  @Input()
  item!: Inventory;

  protected nameFormControl = new FormControl<string>('', [Validators.required]);
  protected unitFormControl = new FormControl();
  protected descriptionFormControl = new FormControl<string>('', [Validators.required]);

  protected inventoryForm!: FormGroup;

  protected units: string[] = [InventoryUnits.Count, InventoryUnits.Meter];

  public constructor(
    protected formBuilder: FormBuilder,
    protected inventoryManager: InventoryManager,
    protected router: Router,
  ) { }

  ngOnInit(): void {
    this.inventoryForm = new FormGroup({
      name: this.nameFormControl,
      unit: this.unitFormControl,
      description: this.descriptionFormControl,
    });
    this.inventoryForm
  }

  protected isEditMode(): boolean {
    return this.item.id.length !== 0;
  }

  onClickShowSupply(item: Inventory): void {
    if (!item.id) {
      return;
    }

    console.log(item.id);
    this.router.navigate(['/inventory', item.id ,'supply']);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.inventoryForm) {
      return;
    }
    this.item = changes['item'].currentValue;
    console.log(changes);

    if (!this.isEditMode()) {
      this.inventoryForm.reset();

      return;
    }
    this.inventoryForm.get('name')!.setValue(this.item.name);
    this.inventoryForm.get('unit')!.setValue(this.item.unit);
    this.inventoryForm.get('description')!.setValue(this.item.description);
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

    if (this.isEditMode() && this.item) {
      this.inventoryManager.getInstance().modify(this.item.id, inventory);

    } else {
      this.inventoryManager.getInstance().insert(inventory);
    }

    console.log('submitted:', this.nameFormControl.value, this.unitFormControl.value, this.descriptionFormControl.value);
  }

  public addInventory() {
    console.log('submitted:', this.nameFormControl.value, this.unitFormControl.value, this.descriptionFormControl.value);
  }
}
