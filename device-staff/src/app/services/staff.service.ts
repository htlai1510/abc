import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

let genderStaff = [
  { name: 'Female', value: '0' },
  { name: 'Male', value: '1' }];


@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient) { }


  getbyid(id) {
    let url = "api/staff/get/";
    return this.http.get(url + id);
  }

  getData() {
    let url = "api/staff/getall";
    return this.http.get(url);
  }

  addStaff(staff: any) {
    let url = "api/staff/insert";
    return this.http.post(url, staff);
  }

  updateStaff(id: any, staff: any) {
    let url = "api/staff/update/";
    return this.http.put(url + id, staff);
  }

  deleteStaff(id: any) {
    let url = "api/staff/delete/";
    return this.http.delete(url + id);
  }

  findByGender(gender: any) {
    let url = "api/staff/findbygender/";
    return this.http.get(url + gender);
  }

  getGender() {
    return genderStaff;
  }
}
