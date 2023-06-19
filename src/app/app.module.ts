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

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    InventoryFormComponent,
    CurrentInventoryComponent,
    SupplyComponent,
    SupplyFormComponent,
    CurrentSupplyComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    routing,
    RouterModule,
  ],
  providers: [InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
