import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Service } from 'src/app/model/Service';
import { ServiceService } from 'src/app/services/service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent implements OnInit {

  service = new FormGroup({

    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500)
    ]),
    phoneNo: new FormControl('', [
      Validators.required, 
      Validators.pattern(/^\d{10}$/)
    ]),

  });

  constructor(
    private  serviceService: ServiceService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  saveService() {

    if(this.service.valid) {
      
      const newService : Service = {
        name: this.service.value.name,
        description: this.service.value.description,
        averageRating: 0
      };

      this.serviceService.createService(newService).subscribe((resonse : any) => {
        
        console.log(newService);
        const createdService = resonse;
        this.toastr.success(`Service ${createdService.name} created successfully!`, 'Success');
      }, error => {
        this.toastr.error('Error creating service!', 'Error');
        console.log(error);
      });

    } else {
      this.toastr.error('Service details are invalid !', 'Error');
    }
  }

}
