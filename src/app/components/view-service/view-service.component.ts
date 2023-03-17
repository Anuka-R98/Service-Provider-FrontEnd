import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/model/Service';

import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css']
})
export class ViewServiceComponent implements OnInit {
  
  service: Service;

  constructor(
    private route: ActivatedRoute,
    private  serviceService: ServiceService
  ) { }

  ngOnInit(): void {

    const serviceId = this.route.snapshot.params['id'];
     this.serviceService.getServiceById(serviceId).subscribe(
      (service: Service) => {
        this.service = service;
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
