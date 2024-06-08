import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  fetchData(filters?: Filters): Observable<any[]> {
    // https://mockapi.io/

    // const url = new URL('https://PROJECT_TOKEN.mockapi.io/users/1/tasks');
    // url.searchParams.append('sortBy', 'title');
    // url.searchParams.append('order', 'desc'); // order parameter is optional and will default to `asc`

    // const url = new URL('https://PROJECT_TOKEN.mockapi.io/users/1/tasks');
    // url.searchParams.append('page', 1);
    // url.searchParams.append('limit', 10);

    let params = new HttpParams();
    if(filters) {
      if(filters.sortBy) {
        params = params.set('sortBy', filters.sortBy);
      }
      if(filters.order) {
        params = params.set('order', filters.order);
      }
      if(filters.limit) {
        params = params.set('limit', filters.limit);
      }
      if(filters.page) {
        params = params.set('page', filters.page);
      }
    }

    return this.http.get<any[]>('https://6664b8bc932baf9032abe981.mockapi.io/users', { params });
  }
}

export interface Filters {
  sortBy?: string;
  order?: 'asc' | 'desc';
  limit?: number;
  page?: number;
}