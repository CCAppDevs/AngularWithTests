import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './Customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  customers: Customer[] = []

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('/api/customers');
  }

  addCustomer(cust: Customer): Observable<Customer> {
    return this.http.post<Customer>('/api/customers', cust);
  }
}
