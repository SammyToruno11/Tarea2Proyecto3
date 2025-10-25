import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProducto } from '../../../interfaces';

@Component({
  selector: 'app-productos-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-tabla.component.html',

})
export class ProductosTablaComponent {
  @Input() productos: IProducto[] = [];
  @Input() areActionsAvailable: boolean = true;

  @Output() callEditMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  @Output() callDeleteMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
}
