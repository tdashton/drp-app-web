import { Component, Input, OnInit } from '@angular/core';
import { Inventory } from '../models/inventory/inventory.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styles: []
})
export class InventoryComponent {
  protected item: Inventory = Inventory.createEmpty();

  constructor(protected route: ActivatedRoute) {}

  onSelected(item: Inventory) {
    this.item = item;
  }

  onAddInventory(): void {
    this.item = Inventory.createEmpty()
  }
}
