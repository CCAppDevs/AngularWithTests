import { Component } from '@angular/core';
import { Customer } from '../Customer';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  customers: Customer[] = []

  addNewForm: FormGroup = this.fb.group({
    firstName: ['first'],
    lastName: ['last'],
    phone: ['phone#'],
    customerID: [0]
  });

  constructor(private data: DataService, private fb: FormBuilder) {
    this.refreshList();
  }

  refreshList() {
    this.data.getAllCustomers().subscribe(result => {
      this.customers = result;
    });
  }

  clearForm() {
    this.addNewForm.patchValue({
      firstName: 'first',
      lastName: 'last',
      phone: 'phone#',
      customerID: 0
    });
  }

  addCustomer() {
    console.log("add customer clicked on component");
    let cust: Customer = {
      customerID: 0,
      firstName: this.addNewForm.controls['firstName'].value,
      lastName: this.addNewForm.controls['lastName'].value,
      phone: this.addNewForm.controls['phone'].value
    }

    this.data.addCustomer(cust).subscribe(result => {
      this.customers.push(result);
      this.clearForm();
    });
  }

  deleteCustomer(id: number) {
    console.log('deleting: ', id);
    this.data.deleteCustomer(id).subscribe(result => {
      this.refreshList();
    });
  }
}
