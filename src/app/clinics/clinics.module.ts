import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicsRouterModule } from './clinics-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClinicsComponent } from './clinics.component';
import { ClinicListComponent } from './clinic-list/clinic-list.component';
import { ClinicDetailsComponent } from './clinic-details/clinic-details.component';
import { ClinicsService } from '../shared/services/clinics.service';
import { HttpInterceptorService } from '../shared/services/http-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    ClinicsRouterModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ],
  declarations: [
    ClinicsComponent,
    ClinicListComponent,
    ClinicDetailsComponent
  ],
  providers: [
    ClinicsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    }
  ]
})
export class ClinicsModule { }
