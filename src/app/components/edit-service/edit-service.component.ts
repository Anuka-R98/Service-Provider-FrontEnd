import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Service } from 'src/app/model/Service';
import { ServiceService } from 'src/app/services/service.service';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

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
    averageRating: new FormControl('', [
      Validators.pattern('^(10|[0-9](\.[0-9])?)$')
    ]),
  });
  @Input() service1: Service;

  constructor(
    private  serviceService: ServiceService,
    public userAuthService: UserAuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  saveService() {
    if (this.userAuthService.roleMatch(['ROLE_ADMIN'])) {
      this.updateServiceByAdmin();
    } else {
      this.updateServicebyProvider();
    }
  }

  updateServiceByAdmin() {

    if(this.service.valid) {
      
      const existingService : Service = {
        name: this.service.value.name,
        description: this.service.value.description,
        phoneNo: this.service.value.phoneNo,
        averageRating: parseFloat(this.service.value.averageRating)
      };

      this.serviceService.updateServiceByAdmin(this.service1.id, existingService).subscribe((resonse : any) => {
        
        console.log(existingService);
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

  updateServicebyProvider() {

    if(this.service.valid) {
      
      const existingService : Service = {
        name: this.service.value.name,
        description: this.service.value.description,
        phoneNo: this.service.value.phoneNo,
      };

      this.serviceService.updateService(this.service1.id, existingService).subscribe((resonse : any) => {
        
        console.log(existingService);
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
