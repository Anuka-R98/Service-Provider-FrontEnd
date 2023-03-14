import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/model/Service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  ServiceList!: Service[];
  deletingExerciseId: string;

  constructor(
   private serviceService : ServiceService
  ) { }

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices() {
    this.serviceService.getAllServices().subscribe((response: any) => {
      this.ServiceList = response;
    });
  }

  getRandomColor() {
    const colors = ['#FF5733', '#C70039', '#900C3F', '#581845', '#FFC300', '#DAF7A6'];
    const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
    const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
    return `${randomColor1}, ${randomColor2}`;
  }
}