import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getData() {
    let url = "api/brand/getall";
    return this.http.get(url);
  }

  addBrand(brand) {
    let url = "api/brand/insert";
    return this.http.post(url, brand);
  }

  deleteBrand(id) {
    let url = "api/brand/delete/";
    return this.http.delete(url + id);
  }

  updateBrand(id, brand) {
    let url = "api/brand/update/";
    return this.http.put(url + id, brand);
  }

}
