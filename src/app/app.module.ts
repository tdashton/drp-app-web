import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryService } from './inventory/inventory.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryFormComponent } from './inventory/inventory-form/inventory-form.component';
import { CurrentInventoryComponent } from './inventory/current-inventory/current-inventory.component';
import { SupplyComponent } from './supply/supply.component';
import { routing } from './app.routing';
import { RouterModule } from '@angular/router';
import { SupplyFormComponent } from './supply/supply-form/supply-form.component';
import { CurrentSupplyComponent } from './supply/current-supply/current-supply.component';
import { SupplyService } from './supply/supply.service';
import { DesignFormComponent } from './design/design-form/design-form.component';
import { DesignComponent } from './design/design.component';
import { CurrentDesignComponent } from './design/current-design/current-design.component';
import { DesignService } from './design/design.service';
import { Manager } from './persistence/manager.class';
import { Design } from './models/design/design.model';
import { LocalStorageAdapter } from './persistence/local-storage-adapter.class';
import InventoryManager from './persistence/inventory.manager.service';
import SupplyManager from './persistence/supply.manager.service';
import { StorageAdapter } from './persistence/storage-adapter.class';
import { ProductComponent } from './product/product.component';
import { CurrentProductComponent } from './product/current-product/current-product.component';
import { ProductInfoComponent } from './product/product-info/product-info.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    InventoryFormComponent,
    CurrentInventoryComponent,
    SupplyComponent,
    SupplyFormComponent,
    CurrentSupplyComponent,
    DesignFormComponent,
    DesignComponent,
    CurrentDesignComponent,
    ProductComponent,
    CurrentProductComponent,
    ProductInfoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    routing,
    RouterModule
  ],
  providers: [
    { provide: StorageAdapter, useClass: LocalStorageAdapter },
    InventoryService,
    SupplyService,
    DesignService,
    InventoryManager,
    SupplyManager,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
