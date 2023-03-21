import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Rating } from '../model/Rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private PATH_OF_RATING = environment.apiBaseUrl + 'services/ratings';

  constructor(private httpClient: HttpClient) { }

  createRating(userId: string, serviceId, rating: Rating) {
    const headers = new HttpHeaders({
      'userId': userId,
      'serviceId': serviceId,
    });
    
    return this.httpClient.post<Response>(this.PATH_OF_RATING, rating, { headers }).pipe(
      tap((response: Response) => {
        console.log(response);
      }),
      catchError((error: any) => {
        console.log(error);
        return of(null);
      })
    );
  }
  
  getAllRatings() {
    return this.httpClient.get(`${this.PATH_OF_RATING}`);
  }
  
  deleteRating(id: string) {
    return this.httpClient.delete(`${this.PATH_OF_RATING}/${id}`);
  }

}

