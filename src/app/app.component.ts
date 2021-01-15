import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Medyana Hospital';
  links = [
    { path: '/clinics', icon: 'medical_services', title: 'Clinics' },
    { path: '/equipments', icon: 'construction', title: 'Equipments' },
  ];

  constructor() {}

}
