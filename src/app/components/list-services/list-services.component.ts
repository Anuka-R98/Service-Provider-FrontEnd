import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/model/Service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css']
})
export class ListServicesComponent implements OnInit {

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
    private toastr: ToastrService
    ) { }
    
    ngOnInit(): void {
      this.getAllServices();
    }
    
    getAllServices() {
      this.serviceService.getAllServices().subscribe((response: any) => {
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
      this.getAllServices();
    }

    onclickDelete(id: string) {
      this.deletingServiceId = id;
    }

    onclickEdit(service: Service) {
        (this.editingService.id = service.id);
        (this.editingService.name = service.name),
        (this.editingService.description = service.description),
        (this.editingService.phoneNo = service.phoneNo),
        (this.editingService.averageRating = service.averageRating),
        
        console.log(this.editingService);
    }


}
