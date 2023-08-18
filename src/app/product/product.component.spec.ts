import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { CurrentProductComponent } from './current-product/current-product.component';
import { StorageAdapter } from '../persistence/storage-adapter.class';
import { LocalStorageAdapter } from '../persistence/local-storage-adapter.class';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductInfoComponent } from './product-info/product-info.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductComponent,
        ProductInfoComponent,
        CurrentProductComponent,
      ],
      providers: [
        { provide: StorageAdapter, useClass: LocalStorageAdapter }
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
      ]
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
