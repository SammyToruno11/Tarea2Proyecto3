import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProducto, ICategoria } from '../../../interfaces';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
})
export class ProductoFormComponent {
  @Input() form!: FormGroup;
  @Input() isEdit: boolean = false;
  @Input() categorias: ICategoria[] = [];
  @Input() showCategorySelector: boolean = true;
  @Output() callSaveMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
}
