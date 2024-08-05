import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private Url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  createItem(data: any) {
    return this.http.post(this.Url + `/Item/create`, data, {
      withCredentials: true,
    });
  }
  getItem() {
    return this.http.get(this.Url + `/Item/get`, {
      withCredentials: true,
    });
  }
}
