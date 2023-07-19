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
  item!: Inventory;

  protected supplyForm = new FormGroup({
    cost: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    amount: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    info: new FormControl(''),
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
      this.item.id,
      this.supplyForm.get('amount')?.value ?? -1,
    );

    this.supplyManager.getInstance().insert(supply);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      throw new Error('This route requires an id');
    }
    this.item = this.inventoryManager.getInstance().getById(id);
  }
}
