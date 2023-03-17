import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rating } from 'src/app/model/Rating';
import { Service } from 'src/app/model/Service';
import { RatingService } from 'src/app/services/rating.service';

import { ServiceService } from 'src/app/services/service.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css']
})
export class ViewServiceComponent implements OnInit {
  
  service: Service;
  showRatingInput: boolean = false;
  ratingValue: number;

  constructor(
    private route: ActivatedRoute,
    private  serviceService: ServiceService,
    private ratingService : RatingService,
    public userAuthService : UserAuthService,
    private toastr: ToastrService,
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

  onAddRatingClick() {
    this.showRatingInput = true;
  }

  onSubmitRating() {
    
    if (this.ratingValue < 0 || this.ratingValue > 10) {
      this.toastr.warning('Please enter a number between 0 and 10! ', 'Error');
      return;
    }
    const serviceId = this.service.id;
    const userId = this.userAuthService.getId();

    const rating: Rating = {
      rating: Number(this.ratingValue.toFixed(1)),
      userId: userId,
      serviceId: serviceId
    };
  
    this.ratingService.createRating(userId, serviceId, rating).subscribe(
      (response: any) => {
        console.log(response);
        this.showRatingInput = false;
        this.toastr.success(`Rating added successfully!`, 'Success');
      },
      (error) => {
        this.toastr.error('Error adding rating! ', 'Error');
      }
    );
  }

}
