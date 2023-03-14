import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Service } from '../model/Service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
providedIn: 'root'
})

export class ServiceService {

private PATH_OF_SERVICE = 'http://localhost:8080/home/services';
private PATH_OF_SERVICE_2 = 'http://localhost:8080/home/admin/services';
private PATH_OF_SERVICE_3 = 'http://localhost:8080/home/provider/services';

constructor(private httpClient: HttpClient) { }

// getServiceList(): Observable<Service[]> {
//   return this.httpClient.get<Service[]>(`${this.PATH_OF_SERVICE}/all`);
// }

getAllServices() {
  return this.httpClient.get(`${this.PATH_OF_SERVICE}/all`);
}

getServiceById(id: String) {
  return this.httpClient.get(`${this.PATH_OF_SERVICE}/id/${id}`);
}

createService(service: Service) {
  return this.httpClient.post<Response>(this.PATH_OF_SERVICE, service).pipe(
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

// getServiceById(id: string): Observable<Service> {
// return this.http.get<Service>(${this.baseUrl}/id/${id});
// }

// createService(service: Service): Observable<Service> {
// return this.http.post<Service>(${this.baseUrl}, service);
// }

// updateService(id: string, service: Service): Observable<Service> {
// return this.http.put<Service>(${this.baseUrl}/${id}, service);
// }

// deleteService(id: string): Observable<any> {
// return this.http.delete(${this.baseUrl}/${id}, { responseType: 'text' });
// }
}