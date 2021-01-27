import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clinic } from '../../../domain/entity/clinic.interface';
import { BASE_URL } from '../core/base';
import { NotificationService } from './notification.service';
import ClinicRepository from 'src/usecases/repository/clinic.repository';

@Injectable({
  providedIn: 'root'
})
export class ClinicsService implements ClinicRepository {
  private model = 'clinics';

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  private getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  getAllClinics(displayNotification: boolean, page: number, limit: number, search: string) {
    let url = `${this.getUrl()}?_page=${page}&_limit=${limit}`;
    if (displayNotification) {
      this.notificationService.notify('Get All Clinics');
    }
    if (search) {
      url = `${url}&q=${search}`;
    }
    return this.http.get<Clinic[]>(url);
  }

  createClinic(clinic: Clinic) {
    this.notificationService.notify('Clinic created');
    console.log(this.http.post<Clinic>(this.getUrl(), clinic));
    return this.http.post<Clinic>(this.getUrl(), clinic);
  }

  updateClinic(clinic: Clinic) {
    this.notificationService.notify('Clinic updated');
    return this.http.put<Clinic>(`${this.getUrl()}/${clinic.id}`, clinic);
  }

  deleteClinic(id: number) {
    this.notificationService.notify('Clinic deleted');
    return this.http.delete(`${this.getUrl()}/${id}`);
  }

}
