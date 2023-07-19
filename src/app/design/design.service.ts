import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  protected static LOCAL_STORAGE_KEY = 'design';

  //  protected designManager: Manager<Design>;
  // public designUpdated = new EventEmitter<Design>();

  constructor( ) {
  }
}
