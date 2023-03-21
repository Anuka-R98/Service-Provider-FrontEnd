import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { Service } from 'src/app/model/Service';
import { ServiceService } from 'src/app/services/service.service';

import { UserService } from 'src/app/services/user.service';
import { User } from '../../model/User';

Chart.register(...registerables);

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(
    private userService: UserService,
    private serviceService: ServiceService
  ) { }

  chartdata: any;
  userList!: User[];
  labeldata: any[] = ['Admin', 'Users', 'Providers'];
  realdata: any[] = [];
  colordata: any[] = ['#E23E57' , '#2ed12e', '#19A7CE'];

  serviceList!: Service[];
  labeldata1: any[] = ['Excellent', 'Good', 'Normal', 'Bad', 'Unrated'];
  realdata1: any[] = [];
  colordata1: any[] = ['#ffa600' , '#f45d34', '#ca0850', '#870060', '#2d005c'];
  
  ngOnInit(): void {
      this.userChart();
      this.serviceChart();
  };

  userChart() {
    this.userService.getUsers().subscribe((response:any) => {

      this.chartdata = response;
      console.log(response)

     if (this.chartdata != null) {

        let adminCount = 0;
        let userCount = 0;
        let providerCount = 0;
        
        for (let i = 0; i < response.length; i++) {
          if (this.chartdata[i].roles[0].name == 'ROLE_ADMIN') {
            adminCount = adminCount + 1;
          } else if (this.chartdata[i].roles[0].name == 'ROLE_SERVICE_PROVIDER') {
            providerCount = providerCount + 1;
          } else {
            userCount = userCount + 1;
          }
        }
        this.realdata.push(adminCount);
        this.realdata.push(userCount);
        this.realdata.push(providerCount);
      }
      this.RenderChart(this.labeldata,this.realdata,this.colordata,'bar','barchart');
      // this.RenderChart(this.labeldata,this.realdata,this.colordata,'pie','piechart');
      // this.RenderChart(this.labeldata,this.realdata,this.colordata,'doughnut','dochart');
      // this.RenderChart(this.labeldata,this.realdata,this.colordata,'polarArea','pochart');
      // this.RenderChart(this.labeldata,this.realdata,this.colordata,'radar','rochart');
      
    }
    )
  }

  serviceChart() {
    this.serviceService.getAllServices().subscribe((response:any) => {

      this.chartdata = response;
      console.log(response)

     if (this.chartdata != null) {

        let excellent = 0;
        let good = 0;
        let normal = 0;
        let bad = 0;
        let unrated = 0;
        
        for (let i = 0; i < response.length; i++) {
          if (this.chartdata[i].averageRating >= 7.5) {
            excellent++;
          } else if (this.chartdata[i].averageRating >= 5.0) {
            good++;
          } else if (this.chartdata[i].averageRating >= 4.0) {
            normal++;
          } else if (this.chartdata[i].averageRating >= 0.1) {
            bad++;
          } else {
            unrated++;
          }
        }
        this.realdata1.push(excellent);
        this.realdata1.push(good);
        this.realdata1.push(normal);
        this.realdata1.push(bad);
        this.realdata1.push(unrated);
      }

      this.RenderChart2(this.labeldata1,this.realdata1,this.colordata1,'pie','piechart');
      
    }
    )
  }
    
    RenderChart(labeldata:any, maindata:any, colordata:any, type:any, id:any) {
      const myChart = new Chart(id, {
        type: type,
        data: {
          labels: labeldata,
          datasets: [{
            label: 'User types',
            data: maindata,
            backgroundColor: colordata,
            borderColor: [
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
  
    }

    RenderChart2(labeldata1:any, maindata1:any, colordata1:any, type:any, id:any) {
      const myChart = new Chart(id, {
        type: type,
        data: {
          labels: labeldata1,
          datasets: [{
            label: 'Service rating types',
            data: maindata1,
            backgroundColor: colordata1,
            borderColor: [
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
  
    }
  }
