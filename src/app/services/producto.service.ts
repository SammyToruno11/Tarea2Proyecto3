import { inject, Injectable, signal } from '@angular/core';
import { IProducto, IResponse, ISearch } from '../interfaces';
import { BaseService } from './base-service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends BaseService<IProducto> {
  protected override source: string = 'products';
  private productoSignal = signal<IProducto[]>([]);

  get productos$() {
    return this.productoSignal;
  }

  public busqueda: ISearch = { 
    page: 1,
    size: 10
  };

  public totalElementos: any = [];
  private alertaService: AlertService = inject(AlertService);

  obtenerTodos() {
    this.findAllWithParams({ page: this.busqueda.page, size: this.busqueda.size }).subscribe({
      next: (respuesta: IResponse<IProducto[]>) => {
        this.busqueda = { ...this.busqueda, ...respuesta.meta };
        this.totalElementos = Array.from(
          { length: this.busqueda.totalPages ? this.busqueda.totalPages : 0 },
          (_, i) => i + 1
        );
        this.productoSignal.set(respuesta.data);
      },
      error: (err: any) => console.error('Error al obtener productos', err)
    });
  }

  obtenerPorCategoriaId(categoriaId: number) {
    this.findAllWithParamsAndCustomSource(`category/${categoriaId}`, { page: this.busqueda.page, size: this.busqueda.size }).subscribe({
      next: (respuesta: IResponse<IProducto[]>) => {
        this.busqueda = { ...this.busqueda, ...respuesta.meta };
        this.totalElementos = Array.from(
          { length: this.busqueda.totalPages ? this.busqueda.totalPages : 0 },
          (_, i) => i + 1
        );
        this.productoSignal.set(respuesta.data);
      },
      error: (err: any) => console.error('Error al obtener productos por categoría', err)
    });
  }

  agregarProductoACategoria(categoriaId: number, producto: IProducto) {
    this.addCustomSource(`category/${categoriaId}`, producto).subscribe({
      next: (respuesta: IResponse<IProducto>) => {
        this.alertaService.displayAlert('success', respuesta.message, 'center', 'top', ['success-snackbar']);
        this.obtenerTodos();
      },
      error: (err: any) => {
        this.alertaService.displayAlert('error', 'Error al agregar el producto', 'center', 'top', ['error-snackbar']);
        console.error('Error', err);
      }
    });
  }

  actualizar(producto: IProducto) {
    this.edit(producto.id!, producto).subscribe({
      next: (respuesta: IResponse<IProducto>) => {
        this.alertaService.displayAlert('success', respuesta.message, 'center', 'top', ['success-snackbar']);
        this.obtenerTodos();
      },
      error: (err: any) => {
        this.alertaService.displayAlert('error', 'Error al actualizar el producto', 'center', 'top', ['error-snackbar']);
        console.error('Error', err);
      }
    });
  }

  eliminar(producto: IProducto) {
    this.del(producto.id!).subscribe({
      next: (respuesta: IResponse<IProducto>) => {
        this.alertaService.displayAlert('success', respuesta.message, 'center', 'top', ['success-snackbar']);
        this.obtenerTodos();
      },
      error: (err: any) => {
        this.alertaService.displayAlert('error', 'Error al eliminar el producto', 'center', 'top', ['error-snackbar']);
        console.error('Error', err);
      }
    });
  }

  eliminarProductoDeCategoria(categoriaId: number, productoId: number) {
    this.delCustomSource(`../categories/${categoriaId}/products/${productoId}`).subscribe({
      next: (respuesta: IResponse<IProducto>) => {
        this.alertaService.displayAlert('success', respuesta.message, 'center', 'top', ['success-snackbar']);
        this.obtenerPorCategoriaId(categoriaId);
      },
      error: (err: any) => {
        this.alertaService.displayAlert('error', 'Error al eliminar el producto', 'center', 'top', ['error-snackbar']);
        console.error('Error', err);
      }
    });
  }
}
