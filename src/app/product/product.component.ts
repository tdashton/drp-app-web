import { Component } from '@angular/core';
import { Design } from '../models/design/design.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  protected design: Design = Design.createEmpty();

  onSelectDesign(design: Design) {
    this.design = design;
  }
}
