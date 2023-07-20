import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Design } from 'src/app/models/design/design.model';
import DesignManager from 'src/app/persistence/design.manager.service';

@Component({
  selector: 'app-current-design',
  templateUrl: './current-design.component.html',
  styles: [`
    .is-clickable {
      cursor: pointer;
    }
    .is-clickable:hover {
      background-color: bisque;
    }
  `]
})
export class CurrentDesignComponent implements OnInit {

  currentDesigns!: Design[]

  @Output() designSelectedEvent = new EventEmitter<Design>();
  @Output() designAddEvent = new EventEmitter();

  constructor(
    protected designManager: DesignManager,
  ) {}

  ngOnInit(): void {
    this.currentDesigns = this.designManager.getInstance().getAll();
  }

  public onClickAddDesign() {
    this.designAddEvent.emit();
  }

  public onClickDesign(design: Design) {
    this.designSelectedEvent.emit(design);
  }
}
