import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipment } from '../interfaces/equipment.interface';
import { BASE_URL } from '../services/base';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {
  model = 'equipments';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }

  private getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  getAllEquipments(displayNotification: boolean, page: number, limit: number, search: string) {
    let url = `${this.getUrl()}?_page=${page}&_limit=${limit}`;
    if (displayNotification) {
      this.notificationService.notify('Get All Equipment');
    }
    if (search) {
      url = `${url}&q=${search}`;
    }
    return this.http.get<Equipment[]>(url);
  }

  createEquipment(clinic: Equipment) {
    this.notificationService.notify('Equipment created');
    return this.http.post<Equipment>(this.getUrl(), clinic);
  }

  updateEquipment(clinic: Equipment) {
    this.notificationService.notify('Equipment updated');
    return this.http.put<Equipment>(`${this.getUrl()}/${clinic.id}`, clinic);
  }

  deleteEquipment(id: number) {
    this.notificationService.notify('Equipment deleted');
    return this.http.delete(`${this.getUrl()}/${id}`);
  }
}
