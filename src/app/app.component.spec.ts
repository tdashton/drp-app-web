import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LocalStorageAdapter } from './persistence/local-storage-adapter.class';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      InventoryComponent,
    ],
    imports: [
      RouterTestingModule,
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'designer-resource-planning'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('designer-resource-planning');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('designer-resource-planning app is running!');
  // });
});
