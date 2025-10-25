import { Component, effect, inject } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductosTablaComponent } from '../../components/producto/productos-tabla/productos-tabla.component';
import { ProductoFormComponent } from '../../components/producto/producto-form/producto-form.component';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IProducto, ICategoria } from '../../interfaces';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    PaginationComponent,
    LoaderComponent,
    ProductosTablaComponent,
    ProductoFormComponent
  ],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
  public productoService = inject(ProductoService);
  public categoriaService = inject(CategoriaService);
  public fb = inject(FormBuilder);

  public form = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    description: [''],
    price: [0],
    stock: [0],
    categoria: [null as ICategoria | null, Validators.required] // ✅ cambio clave
  });

  constructor() {
    this.productoService.obtenerTodos();
    this.categoriaService.obtenerTodos();

    effect(() => {
      console.log('📦 Productos actualizados:', this.productoService.productos$());
    });

    effect(() => {
      console.log('📋 Categorías cargadas:', this.categoriaService.categorias$());
    });
  }

  guardar(item: any) {
    if (!item.categoria?.id) return;

    const payload: IProducto = {
      id: item.id ?? 0,
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
      categoria: item.categoria // ✅ ahora envía el objeto completo
    };

    if (item.id) {
      this.productoService.actualizar(payload);
    } else {
      this.productoService.agregarProductoACategoria(item.categoria.id, payload);
    }

    this.form.reset();
  }

  editarProducto(producto: IProducto) {
    this.form.patchValue({
      id: producto.id,
      name: producto.name,
      description: producto.description,
      price: producto.price,
      stock: producto.stock,
      categoria: producto.categoria ?? null // ✅ carga el objeto completo
    });
  }

  eliminar(item: IProducto) {
    this.productoService.eliminar(item);
  }
}
