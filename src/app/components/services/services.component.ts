import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/model/Service';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  ServiceList!: Service[];

  constructor(
   private serviceService : ServiceService,
   private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices() {
    this.serviceService.getAllServices().subscribe((response: any) => {
      this.ServiceList = response;
    });
  }

}