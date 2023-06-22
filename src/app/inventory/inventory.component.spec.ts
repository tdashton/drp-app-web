import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryComponent } from './inventory.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { CurrentInventoryComponent } from './current-inventory/current-inventory.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        InventoryComponent,
        InventoryFormComponent,
        CurrentInventoryComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    });
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
