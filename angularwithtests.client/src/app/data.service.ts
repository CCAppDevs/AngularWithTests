import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './Customer';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  customers: Customer[] = []

  constructor(private http: HttpClient) { }

  addCustomer(cust: Customer): Observable<Customer[]> {
    return this.http.get<Customer[]>('')
  }
}
