import { Component } from '@angular/core';
import { DesignService } from './design.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styles: [
  ]
})
export class DesignComponent {

  constructor(protected designService: DesignService) {}

}
