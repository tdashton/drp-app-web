import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SupplyManager from '../persistence/supply.manager.service';
import { Inventory } from '../models/inventory/inventory.model';
import InventoryManager from '../persistence/inventory.manager.service';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styles: [
  ]
})
export class SupplyComponent implements OnInit {

  inventoryItem!: Inventory;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected inventoryManager: InventoryManager,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];

    if (!id) {
      this.router.navigate(['inventory']);
    }

    this.inventoryItem = this.inventoryManager.getInstance().getById(id);
  }
}
