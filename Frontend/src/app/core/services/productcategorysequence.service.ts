import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductcategorysequenceService {
  id: string = '';
  private Url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  setid(id: string) {
    this.id = id;
  }
  getid() {
    return this.id;
  }

  get item_area() {
    return this.http.get(this.Url + `/Area/getAreaItem/` + this.id, {
      withCredentials: true,
    });
  }

  areaItem(id: any) {
    return this.http.get(this.Url + `/areaItem/getAreaItem/` + id, {
      withCredentials: true,
    });
  }
  getallareaItem() {
    return this.http.get(this.Url + `/areaItem/get`, {
      withCredentials: true,
    });
  }

  updateareaItem(data: any) {
    return this.http.put(this.Url + `/areaItem/update`, data, {
      withCredentials: true,
    });
  }
  deleteareaItem(id: any) {
    return this.http.delete(this.Url + `/areaItem/delete/` + id, {
      withCredentials: true,
    });
  }
}
