import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentsRouterModule } from './equipment-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { EquipmentsService } from '../shared/services/equipments.service';
import { HttpInterceptorService } from '../shared/services/http-interceptor.service';
import { EquipmentsComponent } from './equipments.component';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { EquipmentDetailsComponent } from './equipment-details/equipment-details.component';
import { ClinicsService } from '../shared/services/clinics.service';

@NgModule({
  imports: [
    CommonModule,
    EquipmentsRouterModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ],
  declarations: [
    EquipmentsComponent,
    EquipmentListComponent,
    EquipmentDetailsComponent,
  ],
  providers: [
    EquipmentsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    ClinicsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    }
  ]
})
export class EquipmentsModule { }
