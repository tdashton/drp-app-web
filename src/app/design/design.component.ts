import { Component } from '@angular/core';
import { DesignService } from './design.service';
import { Design } from '../models/design/design.model';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styles: [
  ]
})
export class DesignComponent {

  public item: Design = Design.createEmpty();

  constructor(protected designService: DesignService) {}

  onAdd(): void {
    this.item = Design.createEmpty();
  }

  onSelected(item: Design) {
    this.item = item;
  }
}
