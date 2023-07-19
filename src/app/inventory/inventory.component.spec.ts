import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { InventoryComponent } from './inventory.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { CurrentInventoryComponent } from './current-inventory/current-inventory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let router: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        InventoryComponent,
        InventoryFormComponent,
        CurrentInventoryComponent
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
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
