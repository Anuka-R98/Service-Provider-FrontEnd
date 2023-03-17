import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/model/Service';
import { ServiceService } from 'src/app/services/service.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-provider-services',
  templateUrl: './provider-services.component.html',
  styleUrls: ['./provider-services.component.css']
})
export class ProviderServicesComponent implements OnInit {

  ServiceList!: Service[];
  searchTerm: string = '';
  deletingServiceId: string;

  editingService: any = {
    id: '',
    name: '',
    description: '',
    averageRating: ''
  };

  constructor(
   private serviceService : ServiceService,
   private userAuthService : UserAuthService,
   private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllProviderServices();
  }

  getAllProviderServices() {
    const userId = this.userAuthService.getId();
    this.serviceService.getAllServicesForUser(userId).subscribe((response: any) => {
    this.ServiceList = response;
    });
  }

  filteredServices() {
    return this.ServiceList.filter(service => 
      service.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteService() {
    this.serviceService.deleteService(this.deletingServiceId).subscribe((response) => {
      console.log(response);
    });
    this.toastr.success('Service Deleted successfully!', 'Success');
    this.getAllProviderServices();
  }

  onclickDelete(id: string) {
    this.deletingServiceId = id;
  }
  
  onclickEdit(service: Service) {
      (this.editingService.id = service.id);
      (this.editingService.name = service.name),
      (this.editingService.description = service.description),
      (this.editingService.phoneNo = service.phoneNo),
      (this.editingService.averageRating = service.averageRating)
  }

}
