import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Equipment } from '../../../domain/entity/equipment.interface';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent {
  @Input() equipments: Equipment;
  @Output() selected = new EventEmitter<Equipment>();
  @Output() deleted = new EventEmitter<number>();
}
