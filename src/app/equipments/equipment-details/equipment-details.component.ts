import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Equipment } from '../../../domain/entity/equipment.interface';

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.scss']
})
export class EquipmentDetailsComponent {
  selectedEquipment: Equipment;
  originalName: string;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set equipment(value) {
    if (value) {
      this.selectedEquipment = Object.assign({}, value);
      this.originalName = value.title;
    }
  }

}
