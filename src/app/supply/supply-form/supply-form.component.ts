import { TypeModifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/inventory/inventory.service';
import { Inventory } from 'src/app/models/inventory/inventory.model';
import { Supply } from 'src/app/models/supply/supply.model';
import { SupplyService } from '../supply.service';

@Component({
  selector: 'app-supply-form',
  templateUrl: './supply-form.component.html',
  styles: [
  ]
})
export class SupplyFormComponent implements OnInit {

  protected inventory: Inventory[] = [];
  protected supplyForm = new FormGroup({
    inventoryId: new FormControl('', [Validators.required]),
    cost: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    amount: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    info: new FormControl(''),
  });

  constructor(
    protected inventoryService: InventoryService,
    protected supplyService: SupplyService,
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

    this.supplyService.addSupply(supply);
  }

  ngOnInit(): void {
    this.inventory = this.inventoryService.getInventory();
//    this.supplyForm.get('inventoryId')?.setValue(this.inventory[0].id);
  }
}
