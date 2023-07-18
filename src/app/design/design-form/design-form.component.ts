import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { InventoryService } from 'src/app/inventory/inventory.service';
import { Inventory } from 'src/app/models/inventory/inventory.model';

@Component({
  selector: 'app-design-form',
  templateUrl: './design-form.component.html',
  styles: [`
    input.ng-touched.ng-invalid {
      border: 1px solid red;
    }
  `]
})
export class DesignFormComponent implements OnInit {

  protected formAddedInventoryControls = new FormArray<any>([]);
  protected addedInventory: Inventory[] = [];

  protected selectedInventoryIndex = -1;

  protected designForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
    inventory: new FormControl(null),
    addedInventory: this.formAddedInventoryControls,
  });

  protected availableInventory!: Inventory[];

  constructor(protected inventoryService: InventoryService) {}

  public onSave() {
    if (!this.designForm.valid) {
      return;
    }
    console.log('saving inventory to design');
  }

  public removeInventoryAt(i: number)  {
    this.formAddedInventoryControls.removeAt(i);
  }

  public onClickAddInventory(): void {
    const selectedIndex = this.designForm.get('inventory')?.value;
    if (selectedIndex === undefined || selectedIndex === null) {
      return;
    }
    this.selectedInventoryIndex = Number.parseInt(this.designForm.get('inventory')?.value!);
    console.log(this.designForm.get('inventory')?.value);
    this.formAddedInventoryControls.push(
      new FormGroup({
        id: new FormControl(this.designForm.get('inventory')?.value, [Validators.required]),
        quantity: new FormControl(null, [Validators.required]),
      })
    );

    console.log(this.formAddedInventoryControls.controls);
  }

  public getInventoryWithId(id: number): Inventory {
    return this.inventoryService.getInventoryById(String(id));
  }

  ngOnInit(): void {
    this.availableInventory = this.inventoryService.getInventory();
  }
}
