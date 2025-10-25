import { inject, Injectable, signal } from '@angular/core';
import { ICategoria, IResponse, ISearch } from '../interfaces';
import { BaseService } from './base-service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService<ICategoria> {
  protected override source: string = 'categories';
  private categoriaSignal = signal<ICategoria[]>([]);

  get categorias$() {
    return this.categoriaSignal;
  }

  public busqueda: ISearch = { page: 1, size: 5 };
  public totalElementos: any = [];
  private alertaService: AlertService = inject(AlertService);

  obtenerTodos() {
    this.findAllWithParams({ page: this.busqueda.page, size: this.busqueda.size }).subscribe({
      next: (respuesta: IResponse<ICategoria[]>) => {
        this.busqueda = { ...this.busqueda, ...respuesta.meta };
        this.totalElementos = Array.from(
          { length: this.busqueda.totalPages ?? 0 },
          (_, i) => i + 1
        );
        this.categoriaSignal.set(respuesta.data);
      },
      error: (err) => console.error('Error al obtener categorías', err)
    });
  }

  guardar(categoria: ICategoria) {
    this.add(categoria).subscribe({
      next: (respuesta: IResponse<ICategoria>) => {
        this.alertaService.displayAlert('success', respuesta.message, 'center', 'top', ['success-snackbar']);
        this.obtenerTodos();
      },
      error: () => {
        this.alertaService.displayAlert('error', 'Error al agregar la categoría', 'center', 'top', ['error-snackbar']);
      }
    });
  }

  actualizar(categoria: ICategoria) {
    this.edit(categoria.id!, categoria).subscribe({
      next: (respuesta: IResponse<ICategoria>) => {
        this.alertaService.displayAlert('success', respuesta.message, 'center', 'top', ['success-snackbar']);
        this.obtenerTodos();
      },
      error: () => {
        this.alertaService.displayAlert('error', 'Error al actualizar la categoría', 'center', 'top', ['error-snackbar']);
      }
    });
  }

  eliminar(categoria: ICategoria) {
    this.del(categoria.id!).subscribe({
      next: (respuesta: IResponse<ICategoria>) => {
        this.alertaService.displayAlert('success', respuesta.message, 'center', 'top', ['success-snackbar']);
        this.obtenerTodos();
      },
      error: () => {
        this.alertaService.displayAlert('error', 'Error al eliminar la categoría', 'center', 'top', ['error-snackbar']);
      }
    });
  }
}
