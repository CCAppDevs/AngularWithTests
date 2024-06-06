import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './Customer';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  customers: Customer[] = []

  constructor() { }
}
