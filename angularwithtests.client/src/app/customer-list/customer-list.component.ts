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
    this.data.getAllCustomers().subscribe(result => {
      this.customers = result;
    });
  }

  addCustomer() {
    console.log("add customer clicked on component");
    let cust: Customer = {
        id: 0,
        firstName: 'test',
        lastName: 'person',
        phone: '5551212'
    }

    this.data.addCustomer(cust).subscribe(result => {
      this.customers.push(result);
    });
  }
}
