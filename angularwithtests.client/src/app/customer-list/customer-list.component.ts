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
    this.data.addCustomer({
      firstName: "Bob",
      lastName: "Jones",
      id: 0,
      phone: '5551212'
    });
  }

  addCustomer() {
    console.log("add customer clicked on component");
    let cust: Customer = {
        id: 0,
        firstName: '',
        lastName: '',
        phone: ''
    }

    this.data.addCustomer(cust);
    this.customers = this.data.customers;
  }
}
