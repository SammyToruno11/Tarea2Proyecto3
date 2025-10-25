import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICategoria } from '../../../interfaces';

@Component({
  selector: 'app-categoria-lista-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria-lista-form.component.html',
  styleUrls: ['./categoria-lista-form.component.scss'] 
})
export class CategoriaListaFormComponent {
  @Input() form!: FormGroup;
  @Output() callSaveMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  @Input() isEdit: boolean = false;
}
