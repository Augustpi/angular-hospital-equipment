import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Clinic } from '../../../domain/entity/clinic.interface';
import ClinicRepository from 'src/usecases/repository/clinic.repository';

export interface GetAllClients {
  execute(
    displayNotification: boolean,
    page: number,
    limit: number,
    search: string
  ): Observable<Clinic[]>;
}

@Injectable({
  providedIn: 'root'
})
export class GetAllClientsImpl implements GetAllClients {
  constructor(
    private clinicRepository: ClinicRepository
  ) {}

  execute(displayNotification: boolean, page: number, limit: number, search: string): Observable<Clinic[]> {
    return this.clinicRepository.getAllClinics(displayNotification, page, limit, search);
  }
}
