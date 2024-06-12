import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './Customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  customers: Customer[] = []

  constructor(private http: HttpClient) {
    console.log("data service started");
  }

  addCustomer(cust: Customer): Observable<Customer> {
    console.log('add customer fired with body', cust);
    return this.http.post<Customer>('/api/customers', cust);
  }

  getAllCustomers(): Observable<Customer[]> {
    console.log('get all customers fired');
    return this.http.get<Customer[]>('/api/customers');
  }
}
