import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/model/Service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  service: Service[] = [];

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.serviceService.getServices().subscribe((service) => this.service = service);
    console.log(this.service);
  }

}
