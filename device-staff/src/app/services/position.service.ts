import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }

  getData() {
    let url = "api/position/getall";
    return this.http.get(url);
  }

  addPosition(position) {
    let url = "api/position/insert";
    return this.http.post(url, position);
  }

  deletePosition(id) {
    let url = "api/position/delete/";
    return this.http.delete(url + id);
  }

  updatePosition(id, position) {
    let url = "api/position/update/";
    return this.http.put(url + id, position);
  }


}
