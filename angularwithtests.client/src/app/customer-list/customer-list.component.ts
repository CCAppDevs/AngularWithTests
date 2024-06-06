import { Component } from '@angular/core';
import { Customer } from '../Customer';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  customers: Customer[] = []

  constructor(private data: DataService) {
    this.data.customers.push({
      firstName: "Bob",
      lastName: "Jones",
      id: 0,
      phone: '5551212'
    });
  }

  addCustomer() {
    // do a thing
    this.customers.push({
      firstName: "Bob",
      lastName: "Jones",
      id: 0,
      phone: '5551212'
    })
  }
}
