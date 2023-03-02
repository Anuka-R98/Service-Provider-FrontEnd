import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Service } from '../model/Service' 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = 'http://localhost:8080/home/services'

  constructor(private http:HttpClient) { }

  getServices(): Observable<Service[]> {  
    return this.http.get<Service[]>(this.apiUrl);
  }
}
