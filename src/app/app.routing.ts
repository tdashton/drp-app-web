import { Routes, RouterModule } from "@angular/router";
import { InventoryComponent } from "./inventory/inventory.component";
import { SupplyComponent } from "./supply/supply.component";

const APP_ROUTES: Routes = [
  { pathMatch: 'prefix', path: 'inventory', component: InventoryComponent },
  { pathMatch: 'prefix', path: 'supply', component: SupplyComponent, /* children: USER_ROUTES */ },
  { pathMatch: 'prefix', path: '**', redirectTo: '/inventory' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
