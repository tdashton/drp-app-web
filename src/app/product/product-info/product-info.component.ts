import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DesignService } from 'src/app/design/design.service';
import { InventoryService } from 'src/app/inventory/inventory.service';
import { Design } from 'src/app/models/design/design.model';
import InventoryManager from 'src/app/persistence/inventory.manager.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styles: []
})
export class ProductInfoComponent implements OnChanges {
  @Input() inputDesign: Design = Design.createEmpty();

  constructor(
    protected designService: DesignService,
    protected inventoryManager: InventoryManager,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['inputDesign'].currentValue);
    console.log(this.designService.previewCosts((changes['inputDesign'].currentValue)));
  }
}
