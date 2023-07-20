import { TypeModifier } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/inventory/inventory.service';
import { Inventory } from 'src/app/models/inventory/inventory.model';
import { Supply } from 'src/app/models/supply/supply.model';
import { SupplyService } from '../supply.service';
import { ActivatedRoute } from '@angular/router';
import InventoryManager from 'src/app/persistence/inventory.manager.service';
import SupplyManager from 'src/app/persistence/supply.manager.service';

@Component({
  selector: 'app-supply-form',
  templateUrl: './supply-form.component.html',
  styles: [
  ]
})
export class SupplyFormComponent implements OnInit {
  @Input()
  inventoryItem!: Inventory;

  protected supplyForm = new FormGroup({
    cost: new FormControl<number | null>(null, [Validators.required, Validators.pattern(/^([\d.])+$/)]),
    amount: new FormControl<number | null>(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    info: new FormControl<string>(''),
  });

  constructor(
    protected route: ActivatedRoute,
    protected inventoryManager: InventoryManager,
    protected supplyManager: SupplyManager,
  ) { }

  onSubmit() {
    if (!this.supplyForm.valid) {
      return;
    }

    const supply = new Supply(
      this.supplyForm.get('id')?.value ?? '',
      this.supplyForm.get('info')?.value ?? '',
      this.supplyForm.get('cost')?.value ?? -1,
      this.inventoryItem.id,
      this.supplyForm.get('amount')?.value ?? -1,
    );

    this.supplyManager.getInstance().insert(supply);

    this.supplyForm.reset();
  }

  ngOnInit(): void {
    // console.log(this.inventoryItem);
  }
}
