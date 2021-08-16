import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  get(id) {
    let url = "api/location/get/";
    return this.http.get(url + id);
  }

  getData() {
    let url = "api/location/getall";
    return this.http.get(url);
  }

  getLocation() {
    let url = "api/location/getlocation";
    return this.http.get(url);
  }

  getFloor() {
    let url = "api/location/getfloor";
    return this.http.get(url);
  }

  getRoom() {
    let url = "api/location/getroom";
    return this.http.get(url);
  }

  addLocation(location: any) {
    let url = "api/location/insert";
    return this.http.post(url, location);
  }

  updateLocation(id: any, location: any) {
    let url = "api/location/update/";
    return this.http.put(url + id, location);
  }

  deleteLocation(id: any) {
    let url = "api/location/delete/";
    return this.http.delete(url + id);
  }

  addFloor(floor: any) {
    let url = "api/location/insertfloor";
    return this.http.post(url, floor);
  }

  updateFloor(id: any, floor: any) {
    let url = "api/location/updatefloor/";
    return this.http.put(url + id, floor);
  }

  deleteFloor(id: any) {
    let url = "api/location/deletefloor/";
    return this.http.delete(url + id);
  }
}
