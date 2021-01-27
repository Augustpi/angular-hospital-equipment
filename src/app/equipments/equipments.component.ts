import { Component, OnInit } from '@angular/core';
import { Equipment } from '../../domain/entity/equipment.interface';
import { EquipmentsService } from '../shared/services/equipments.service';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent implements OnInit {

  selectedClinic = null;
  clinics = null;

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  searchText = null;

  equipments$: Observable<Equipment[]>;
  selectedEquipment: Equipment;

  constructor(
    private equipmentsService: EquipmentsService,
  ) { }

  ngOnInit(): void {
    this.loadEquipment(false, true);
    this.resetEquipment();
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.loadEquipment(false);
  }

  selectEquipment(eq: Equipment) {
    this.selectedEquipment = eq;
  }

  loadEquipment(displayNotification: boolean, init: boolean = false) {
    this.equipments$ = this.equipmentsService.getAllEquipments(
      displayNotification,
      this.pageIndex,
      this.pageSize,
      this.searchText
    );
    if (init) {
      this.equipmentsService
        .getAllEquipments(displayNotification, this.pageIndex, 10000, null)
        .subscribe((result) => this.length = result.length);
    }
  }

  saveEquipment(eq: Equipment) {
    if (eq.id) {
      this.updateEquipment(eq);
    } else {
      this.createEquipment(eq);
      this.length += 1;
    }
    this.resetEquipment();
  }

  updateEquipment(eq: Equipment) {
    this.equipmentsService
    .updateEquipment(eq)
    .pipe(tap(() => this.loadEquipment(false))
    ).subscribe();
  }

  createEquipment(eq: Equipment) {
    this.equipmentsService
    .createEquipment(eq)
    .pipe(tap(() => this.loadEquipment(false)))
    .subscribe();
  }

  deleteEquipment(id: number) {
    this.equipmentsService
    .deleteEquipment(id)
    .pipe(tap(() => this.loadEquipment(false))).subscribe();
    this.length -= 1;
  }

  search(q: string) {
    this.searchText = q;
    this.loadEquipment(false);
  }

  resetEquipment() {
    const empty: Equipment = {
      id: null,
      name: '',
      date: new Date(),
      amount: 1,
      price: 0.01,
      usage: 0,
      clinicId: 0
    };

    this.selectEquipment(empty);
  }

}
