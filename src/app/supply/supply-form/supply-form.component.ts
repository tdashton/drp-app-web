import { TypeModifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/inventory/inventory.service';
import { Inventory } from 'src/app/models/inventory/inventory.model';
import { Supply } from 'src/app/models/supply/supply.model';

@Component({
  selector: 'app-supply-form',
  templateUrl: './supply-form.component.html',
  styles: [
  ]
})
export class SupplyFormComponent implements OnInit {

  protected inventory: Inventory[] = [];
  protected supplyForm = new FormGroup({
    inventoryItemId: new FormControl('', [Validators.required]),
    cost: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    amount: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    info: new FormControl(''),
  });

  constructor(
    protected inventoryService: InventoryService
  ) { }

  onSubmit() {
    if (!this.supplyForm.valid) {
      return;
    }

    const supply = new Supply(
      this.supplyForm.get('id')?.value ?? '',
      this.supplyForm.get('info')?.value ?? '',
      this.supplyForm.get('cost')?.value ?? -1,
      this.supplyForm.get('inventoryId')?.value ?? '',
      this.supplyForm.get('amount')?.value ?? -1,
    );

    console.log(supply);
  }

  ngOnInit(): void {
    this.inventory = this.inventoryService.getInventory();
    this.supplyForm.get('inventoryItemId')?.setValue(this.inventory[0].id);
  }

}
