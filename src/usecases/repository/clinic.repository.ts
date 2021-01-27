import { Observable } from 'rxjs';
import { Clinic } from '../../domain/entity/clinic.interface';

export default abstract class ClinicRepository {

  abstract getAllClinics(displayNotification: boolean, page: number, limit: number, search: string): Observable<Clinic[]>;

  abstract createClinic(clinic: Clinic): Observable<Clinic>;

  abstract updateClinic(clinic: Clinic): Observable<Clinic>;

  abstract deleteClinic(id: number): void;

}
