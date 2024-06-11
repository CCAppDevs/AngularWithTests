import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerListComponent } from './customer-list.component';
import { Customer } from '../Customer';
import { DataService } from '../data.service';
import { Observable, of } from 'rxjs';

class MockDataService {
  customers: Customer[] = [{
    id: 0,
    firstName: 'Bob',
    lastName: 'Jones',
    phone: '5551212'
  }];

  addCustomer(customer: Customer): Observable<Customer> {
    this.customers.push(customer);
    return of(customer);
  }

  getAllCustomers(): Observable<Customer[]> {
    return of(this.customers);
  }

}

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let customer: Customer;
  let dataService: MockDataService;

  // arrange
  beforeEach(() => {
    dataService = new MockDataService();
    TestBed.configureTestingModule({
      declarations: [CustomerListComponent],
      providers: [{ provide: DataService, useValue: dataService }]
    });
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;

    customer = dataService.customers[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    // act here

    // assert here
    expect(component).toBeTruthy();
  });

  it('should have a customer list', () => {
    expect(component.customers).toBeDefined();
    expect(component.customers).toEqual([customer]);
    expect(component.customers[0].firstName).toEqual("Bob");
  });

  it('should add a new customer when addCustomer is fired', () => {
    component.addCustomer();

    expect(component.customers.length).toEqual(3);
  });

  it('should have Customer List as the heading', () => {
    // find a specific element in your DOM
    const heading: HTMLElement = fixture.nativeElement;
    const h1 = heading.querySelector('h1')!;

    expect(h1.textContent).toEqual("Customer List");
    // expect that element to contain 'Customer List'
  });
});
