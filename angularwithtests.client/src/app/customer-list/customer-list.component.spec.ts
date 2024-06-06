import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerListComponent } from './customer-list.component';
import { Customer } from '../Customer';
import { DataService } from '../data.service';

class MockDataService {
  customers: Customer[] = [{
    id: 0,
    firstName: 'Bob',
    lastName: 'Jones',
    phone: '5551212'
  }];
}

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let customer: Customer;
  let dataService: MockDataService;

  // arrange
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerListComponent],
      providers: [{ provide: dataService, useClass: MockDataService }]
    });
    fixture = TestBed.createComponent(CustomerListComponent);
    dataService.inject(MockDataService)
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
    component.customers.push(customer);

    expect(component.customers).toBeDefined();
    expect(component.customers).toEqual([customer]);
    expect(component.customers[0].firstName).toEqual("Bob");
  });

  it('should add a new customer when addCustomer is fired', () => {
    component.addCustomer();

    expect(component.customers.length).toEqual(1);
  });
});
