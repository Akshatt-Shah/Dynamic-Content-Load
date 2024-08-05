import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategorysequenceService {
  private Url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  createcategory(data: any) {
    return this.http.post(this.Url + `/Area/create`, data, {
      withCredentials: true,
    });
  }
  updatecategory(id: string, data: any) {
    return this.http.put(this.Url + `/Area/update/` + id, data, {
      withCredentials: true,
    });
  }
  getcategory(page?: number, size?: number) {
    if (page && size) {
      return this.http.get(this.Url + `/Area/get?page=${page}&size=${size}`, {
        withCredentials: true,
      });
    } else {
      return this.http.get(this.Url + `/Area/get`, {
        withCredentials: true,
      });
    }
  }
}
