import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Clinic } from 'src/app/shared/interfaces/clinic.interface';

@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.scss']
})
export class ClinicListComponent {
  @Input() clinics: Clinic;
  @Input() isDelete: boolean;
  @Input() length: number;
  @Input() pageSize: number;
  @Input() showFirstLastButtons: number;
  @Input() pageSizeOptions: Array<number>;
  @Input() pageIndex: number;
  @Output() selected = new EventEmitter<Clinic>();
  @Output() deleted = new EventEmitter<number>();
  @Output() page = new EventEmitter<number>();
  @Output() search = new EventEmitter<string>();

  searchField = '';

}
