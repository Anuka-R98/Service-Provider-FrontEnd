import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Service } from '../model/Service';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
providedIn: 'root'
})

export class ServiceService {

  private PATH_OF_SERVICE = environment.apiBaseUrl + 'services';
  private PATH_OF_SERVICE_2 = environment.apiBaseUrl +'admin/services';
  private PATH_OF_SERVICE_3 = environment.apiBaseUrl + 'provider/services';

constructor(private httpClient: HttpClient) { }


getAllServices() {
  return this.httpClient.get(`${this.PATH_OF_SERVICE}/all`);
}

getServiceById(id: String) {
  return this.httpClient.get(`${this.PATH_OF_SERVICE}/id/${id}`);
}

createService(userId: string, service: Service) {
  const headers = new HttpHeaders({
    'userId': userId
  });
  
  return this.httpClient.post<Response>(this.PATH_OF_SERVICE, service, { headers }).pipe(
    tap((response: Response) => {
      console.log(response);
    }),
    catchError((error) => {
      console.log(error);
      return of(null);
    })
  );
}

getAllServicesForUser(userId: string) {
  const url = `${this.PATH_OF_SERVICE}/userid/${userId}`;
  return this.httpClient.get(url).pipe(
    tap((response: Response) => {
      console.log(response);
    }),
    catchError((error) => {
      console.log(error);
      return of(null);
    })
  );
}

updateServiceByAdmin(id: string, service: Service) {
  return this.httpClient.put(`${this.PATH_OF_SERVICE_2}/${id}`, service);
}

updateService(id: string, service: Service) {
  return this.httpClient.put(`${this.PATH_OF_SERVICE_3}/${id}`, service);
}

deleteService(id: string) {
  return this.httpClient.delete(`${this.PATH_OF_SERVICE}/${id}`);
}

}