import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private http: HttpClient) { }

  getData() {
    let url = "api/productType/getall";
    return this.http.get(url);
  }

  addProductType(productType) {
    let url = "api/productType/insert";
    return this.http.post(url, productType);
  }

  deleteProductType(id) {
    let url = "api/productType/delete/";
    return this.http.delete(url + id);
  }

  updateProductType(id, productType) {
    let url = "api/productType/update/";
    return this.http.put(url + id, productType);
  }


}
