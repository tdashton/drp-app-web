import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Design } from 'src/app/models/design/design.model';
import DesignManager from 'src/app/persistence/design.manager.service';

@Component({
  selector: 'app-current-product',
  templateUrl: './current-product.component.html',
  styles: [`
    .is-clickable {
      cursor: pointer;
    }
    .is-clickable:hover {
      background-color: bisque;
    }
  `]
})
export class CurrentProductComponent implements OnInit {

  @Output() eventOnSelectDesign = new EventEmitter<Design>();

  designs: Design[] = [];

  constructor(
    protected designManager: DesignManager,
  ) {}

  onSelectDesign(design: Design) {
    this.eventOnSelectDesign.emit(design);
  }

  ngOnInit(): void {
    this.designs = this.designManager.getInstance().getAll();
    console.log(this.designs);
  }
}
