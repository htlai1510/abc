import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

let trackingForm = {
  idStaff: 0,
  idDevice: 0,
  status: 0,
  lastUpdatedBy: "",
  createdBy: ""
};

let borrowForm = {
  idProductType: 0,
  amount: 0,
  user: ""
};

let status =
  [{ name: 'Inctive', value: 0 },
    { name: 'Active', value: 1 },
    { name: 'Borrowing', value: 2 },
    { name: 'Returning', value: 3 }];

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(private http: HttpClient) { }
  RemoveRequest(id) {
    let url = "api/tracking/removerequest/";
    return this.http.delete(url + id);
  }
  endTaskDevice(id, value = null) {
    let url = "api/tracking/endtask/";
    return this.http.put(url + id, value);
  }

  borrowDevice(value) {
    let url = "api/tracking/borrowdevice";
    return this.http.post(url, value);
  }

  acceptBorrow(id, value) {
    let url = "api/tracking/acceptborrow/";
    return this.http.put(url + id, value);
  }

  addTracking(value) {
    let url = "api/tracking/activedevice";
    return this.http.post(url, value);
  }

  getByDevice(id) {
    let url = "api/tracking/getbydevice/";
    return this.http.get(url + id);
  }


  getData() {
    let url = "api/tracking/getall";
    return this.http.get(url);
  }

  getTrackingForm() {
    return trackingForm;
  }

  getBorrowForm() {
    return borrowForm;
  }

  getStatus() {
    return status;
  }
}
