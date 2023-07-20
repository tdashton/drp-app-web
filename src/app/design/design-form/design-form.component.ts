import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Form, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { InventoryService } from 'src/app/inventory/inventory.service';
import { DesignInventory } from 'src/app/models/design/design-inventory.model';
import { Design } from 'src/app/models/design/design.model';
import { Inventory } from 'src/app/models/inventory/inventory.model';
import DesignManager from 'src/app/persistence/design.manager.service';
import InventoryManager from 'src/app/persistence/inventory.manager.service';

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

  protected formAddedInventoryControls = new FormArray<FormGroup>([]);
  protected selectedInventoryIndex = -1;
  @Input()
  item!: Design;

  protected designForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
    inventory: new FormControl(null),
    addedInventory: this.formAddedInventoryControls,
  });

  protected availableInventory!: Inventory[];

  constructor(
    protected inventoryManager: InventoryManager,
    protected designManager: DesignManager,
  ) {}

  protected isEditMode(): boolean {
    return this.item.id.length !== 0;
  }

  onRemove(item: Design) {
    this.designManager.getInstance().remove(item.id);
    this.designForm.reset();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.designForm) {
      return;
    }

    this.formAddedInventoryControls.clear();

    this.designForm.get('name')?.setValue(changes['item'].currentValue["name"]);
    this.designForm.get('description')?.setValue(changes['item'].currentValue["description"]);
    changes['item'].currentValue['inventory'].forEach((designInventory: DesignInventory) => {
     console.log(designInventory);
     this.formAddedInventoryControls.push(
       new FormGroup({
         id: new FormControl(designInventory.inventoryId, [Validators.required]),
         quantity: new FormControl<Number | null>(designInventory.amount, [Validators.required]),
       })
     );
    }) as DesignInventory[]

    console.log(changes['item'].currentValue.inventory);
  }

  public onSave() {
    if (!this.designForm.valid) {
      return;
    }

    const name: string = this.designForm.get('name')?.value ?? '';
    const description: string = this.designForm.get('description')?.value ?? '';
    const inventory: DesignInventory[] = [];

    this.formAddedInventoryControls.controls.forEach((group) => {
      inventory.push(DesignInventory.fromObject({
        inventoryId: group.value?.id, amount: Number.parseInt(group.value?.quantity),
      }));
    })

    const design = Design.fromObject({
      name, description, inventory 
    });

    console.log('saving inventory to design', design);

    if (this.isEditMode()) {
      this.designManager.getInstance().modify(this.item.id, design);
    } else {
      this.designManager.getInstance().insert(design);
    }
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
    console.log("inventory id", this.designForm.get('inventory')?.value);
    this.formAddedInventoryControls.push(
      new FormGroup({
        id: new FormControl(this.designForm.get('inventory')?.value, [Validators.required]),
        quantity: new FormControl<Number | null>(null, [Validators.required]),
      })
    );

    console.log(this.formAddedInventoryControls.controls);
  }

  public getInventoryWithId(id: number): Inventory {
    return this.inventoryManager.getInstance().getById(String(id));
  }

  ngOnInit(): void {
    this.availableInventory = this.inventoryManager.getInstance().getAll();
  }
}
