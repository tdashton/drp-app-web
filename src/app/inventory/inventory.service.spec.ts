import { TestBed } from '@angular/core/testing';

import { InventoryService } from './inventory.service';
import InventoryManager from '../persistence/inventory.manager.service';
import { StorageAdapter } from '../persistence/storage-adapter.class';
import { LocalStorageAdapter } from '../persistence/local-storage-adapter.class';

describe('InventoryService', () => {
  let service: InventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InventoryManager,
        { provide: StorageAdapter, useClass: LocalStorageAdapter }
      ],
    });
    service = TestBed.inject(InventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
