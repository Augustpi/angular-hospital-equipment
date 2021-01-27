import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClinicsService } from '../shared/services/clinics.service';
import { Clinic } from '../../domain/entity/clinic.interface';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss']
})
export class ClinicsComponent implements OnInit {

  length = 500;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  searchText = null;

  clinics$: Observable<Clinic[]>;
  selectedClinic: Clinic;

  constructor(private clinicsService: ClinicsService) { }

  ngOnInit(): void {
    this.loadClinics(false, true);
    this.resetClinic();
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.loadClinics(false);
  }

  selectClinic(clinic: Clinic) {
    this.selectedClinic = clinic;
  }

  loadClinics(displayNotification: boolean, init: boolean = false) {
    this.clinics$ = this.clinicsService
      .getAllClinics(
        displayNotification,
        this.pageIndex,
        this.pageSize,
        this.searchText
      );

    if (init) {
      this.clinicsService
        .getAllClinics(displayNotification, this.pageIndex, 10000, null)
        .subscribe(result => this.length = result.length);
    }
  }

  saveClinic(clinic: Clinic) {
    if (clinic.id) {
      this.updateClinic(clinic);
    } else {
      this.createClinic(clinic);
      this.length += 1;
    }
    this.resetClinic();
  }

  updateClinic(clinic: Clinic) {
    this.clinicsService
      .updateClinic(clinic)
      .pipe(tap(() => this.loadClinics(false)))
      .subscribe();
  }

  createClinic(clinic: Clinic) {
    this.clinicsService
      .createClinic(clinic)
      .pipe(tap(() => this.loadClinics(false)))
      .subscribe();
  }

  deleteClinic(id: number) {
    this.clinicsService
      .deleteClinic(id)
      .pipe(tap(() => this.loadClinics(false)))
      .subscribe();
    this.length -= 1;
  }

  search(q: string) {
    this.searchText = q;
    this.loadClinics(false);
  }

  resetClinic() {
    const emptyclinic: Clinic = {
      id: null,
      name: ''
    };

    this.selectClinic(emptyclinic);
  }

}
