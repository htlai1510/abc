import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';

let trackingForm = {
  idStaff: "",
  idDevice: "",
  lastUpdatedBy: "",
  createdBy: ""
}

let status = [
  { name: 'Inactive', value: '0' },
  { name: 'Active', value: '1' }];





@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  getData() {
    let url = "api/device/getall";
    return this.http.get(url);
  }

  getDevice(id) {
    let url = "api/device/get/";
    return this.http.get(url + id);
  }

  GetDeviceBorrowingByUser(idStaff) {
    let url = "api/device/getdeviceborrowingbyuser/";
    return this.http.get(url + idStaff);
  }

  getDeviceUsingByUser(idStaff) {
    let url = "api/device/getdeviceusingbyuser/";
    return this.http.get(url + idStaff);
  }

  getDeviceEmptyByUser(idStaff) {
    let url = "api/device/getdeviceemptybyuser/";
    return this.http.get(url + idStaff);
  }

  getDeviceUsing() {
    let url = "api/device/getdeviceusing";
    return this.http.get(url);
  }


  getDeviceBorrow() {
    let url = "api/device/getdeviceborrow";
    return this.http.get(url);
  }


  getDeviceEmpty() {
    let url = "api/device/getdeviceempty";
    return this.http.get(url);
  }



  countDevice() {
    let url = "api/device/countdevice";
    return this.http.get(url);
  }

  addDevice(device) {
    let url = "api/device/insert";
    return this.http.post(url, device); 
  }

  deleteDevice(id) {
    let url = "api/device/delete/";
    return this.http.delete(url + id);
  }

  updateDevice(id, device) {
    let url = "api/device/update/";
    return this.http.put(url + id, device);
  }

  getTrackingForm() {
    return trackingForm;
  }


}
