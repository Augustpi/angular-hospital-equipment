import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clinic } from 'src/app/shared/interfaces/clinic.interface';

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.scss']
})
export class ClinicDetailsComponent {
  selectedClinic: Clinic;
  originalName: string;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set clinic(value) {
    if (value) {
      this.selectedClinic = Object.assign({}, value);
      this.originalName = value.title;
    }
  }

}
