import { Routes, RouterModule } from "@angular/router";
import { InventoryComponent } from "./inventory/inventory.component";
import { SupplyComponent } from "./supply/supply.component";
import { DesignFormComponent } from "./design/design-form/design-form.component";
import { DesignComponent } from "./design/design.component";

const APP_ROUTES: Routes = [
  { pathMatch: 'prefix', path: 'inventory/:id/supply', component: SupplyComponent, /* children: USER_ROUTES */ },
  { pathMatch: 'prefix', path: 'inventory/:id', component: InventoryComponent },
  { pathMatch: 'prefix', path: 'inventory/add', component: InventoryComponent },
  { pathMatch: 'prefix', path: 'inventory', component: InventoryComponent },
  { pathMatch: 'prefix', path: 'supply', redirectTo: '/inventory' },
  { pathMatch: 'prefix', path: 'design', component: DesignComponent, /* children: USER_ROUTES */ },
  { pathMatch: 'prefix', path: '**', redirectTo: '/inventory' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
