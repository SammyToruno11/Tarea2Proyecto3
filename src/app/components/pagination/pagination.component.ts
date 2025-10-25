import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() service: any;

  onPage(page: number) {
    if (page < 1 || page > this.service.totalElementos.length) return;

    this.service.busqueda.page = page;
    this.service.obtenerTodos();
  }

  trackByIndex(index: number): number {
    return index;
  }
}
