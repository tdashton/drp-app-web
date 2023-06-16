import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryService } from './inventory/inventory.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryFormComponent } from './inventory/inventory-form/inventory-form.component';
import { CurrentInventoryComponent } from './inventory/current-inventory/current-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    InventoryFormComponent,
    CurrentInventoryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
