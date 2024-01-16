import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MasterService {
  constructor(private http: HttpClient) { }

  getall() {
    return this.http.get(`${environment.apiUrl}/api/master`).pipe(map((res: any) => {
      return res;
    }));
  }

  getbyId(id: string) {
    let params = new HttpParams();
    params = params.append('id', id);
    const opts = { params: params };

    return this.http.get(`${environment.apiUrl}/api/master`, opts).pipe(map((res: any) => {
      return res;
    }));
  }

  postmaster(data: any) {
    return this.http.post(`${environment.apiUrl}` + '/api/master', data).pipe(map(res => {
      return res
    }))
  }

  putmaster(id: string, data: any) {

    return this.http.put(`${environment.apiUrl}` + '/api/master/' + id, data).pipe(map(res => {
      return res
    }))
  }

  deletemaster(id: string) {
    return this.http.delete(`${environment.apiUrl}` + '/api/master/' + id).pipe(map(res => {
      return res
    }))
  }


}
